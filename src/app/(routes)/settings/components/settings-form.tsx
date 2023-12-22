'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { User } from '@/db/types';
import { SettingsFormSchema, SettingsFormValues } from '../data';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface SettingsFormProps {
  user: User;
}

const SettingsForm = ({ user }: SettingsFormProps) => {
  const router = useRouter();
  const settingsForm = useForm<SettingsFormValues>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      name: user.name ?? '',
      about: user.about ?? '',
    },
  });

  // Loading State
  const isLoading = settingsForm.formState.isSubmitting;

  const onSubmit = async (values: SettingsFormValues) => {
    // const toastId = toast('Settings', { position: 'top-right' });

    try {
      const response = await axios.post('/api/settings', values);

      if (response.status === 200) {
        toast.success('Settings updated!');
        settingsForm.reset();
      } else {
        toast.error('Something went wrong.');
      }
    } catch (err: any) {
      toast.error(err.message);
      console.log(err);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Form {...settingsForm}>
        <form
          onSubmit={settingsForm.handleSubmit(onSubmit)}
          className='grid w-full grid-cols-6 gap-2 space-y-2 rounded-lg
          border p-4 px-3 focus-within:shadow-sm md:px-6 lg:space-y-0'
        >
          <FormField
            control={settingsForm.control}
            name='name'
            render={({ field }) => (
              <FormItem className='col-span-6 lg:col-span-5'>
                <FormLabel>Name</FormLabel>
                <FormControl className='m-0 p-0'>
                  <Input
                    disabled={isLoading}
                    className='border-0 px-2 outline-none 
                    focus-visible:ring-0 focus-visible:ring-transparent'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={settingsForm.control}
            name='about'
            render={({ field }) => (
              <FormItem className='col-span-6 lg:col-span-5'>
                <FormLabel>About</FormLabel>
                <FormControl className='m-0 p-0'>
                  <Textarea
                    disabled={isLoading}
                    className='border-0 px-2 outline-none focus-visible:ring-0 
                    focus-visible:ring-transparent'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What would you like to share to improve our responses?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='col-span-6 w-full' disabled={isLoading}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SettingsForm;
