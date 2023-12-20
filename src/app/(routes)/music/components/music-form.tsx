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
    const toastId = toast('Music', { position: 'top-right' });

    try {
      setMusic(undefined);

      toast.loading('Composing music...', {
        id: toastId,
        duration: 30000,
        cancel: { label: 'Dismiss', onClick: () => toast.dismiss(toastId) },
      });

      const response = await axios.post('/api/music', values);

      setMusic(response.data);
      toast.dismiss(toastId);
      musicForm.reset();
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
      console.log(err);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Form {...musicForm}>
        <form
          onSubmit={musicForm.handleSubmit(onSubmit)}
          className='grid w-full grid-cols-6 gap-2 space-y-2 rounded-lg
          border p-4 px-3 focus-within:shadow-sm md:px-6 lg:space-y-0'
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
    </div>
  );
};

export default MusicForm;
