'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { MusicFormSchema, MusicFormValues, audioLengthOptions } from '../data';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MusicFormProps {
  setMusic: Dispatch<SetStateAction<string | undefined>>;
}

const MusicForm = ({ setMusic }: MusicFormProps) => {
  const router = useRouter();
  const musicForm = useForm<MusicFormValues>({
    resolver: zodResolver(MusicFormSchema),
    defaultValues: {
      prompt: '',
      length: '8',
    },
  });

  // Loading State
  const isLoading = musicForm.formState.isSubmitting;

  const onSubmit = async (values: MusicFormValues) => {
    try {
      setMusic(undefined);

      const responsePromise = axios.post('/api/music', values);

      toast.promise(responsePromise, {
        id: 'Music',
        position: 'top-right',
        loading: 'Composing music...',
        error: 'Something went wrong.',
      });

      const response = await responsePromise;

      if (response.status === 200) {
        setMusic(response.data);
        musicForm.reset();
      }
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    } finally {
      router.refresh();
    }
  };

  return (
    <Form {...musicForm}>
      <form
        onSubmit={musicForm.handleSubmit(onSubmit)}
        className='grid w-full grid-cols-6 gap-2 rounded-lg
          border px-3 py-2 focus-within:shadow-sm md:px-4'
      >
        <FormField
          control={musicForm.control}
          name='prompt'
          render={({ field }) => (
            <FormItem className='col-span-6 lg:col-span-4'>
              <FormControl className='m-0 p-0'>
                <Input
                  disabled={isLoading}
                  placeholder='Generate 90s gangsta rap.'
                  className='border-0 px-2 outline-none 
                    focus-visible:ring-0 focus-visible:ring-transparent'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={musicForm.control}
          name='length'
          render={({ field }) => (
            <FormItem className='col-span-3 lg:col-span-1'>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue defaultValue={field.value} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {audioLengthOptions.map((amount, index) => (
                    <SelectItem key={index} value={amount.value}>
                      {amount.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button
          className='col-span-3 w-full lg:col-span-1'
          disabled={isLoading}
        >
          Generate
        </Button>
      </form>
    </Form>
  );
};

export default MusicForm;
