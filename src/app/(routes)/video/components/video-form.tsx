'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { VideoFormSchema, VideoFormValues } from '../data';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface VideoFormProps {
  setVideo: Dispatch<SetStateAction<string | undefined>>;
}

const VideoForm = ({ setVideo }: VideoFormProps) => {
  const router = useRouter();
  const videoForm = useForm<VideoFormValues>({
    resolver: zodResolver(VideoFormSchema),
    defaultValues: {
      prompt: '',
    },
  });

  // Loading State
  const isLoading = videoForm.formState.isSubmitting;

  const onSubmit = async (values: VideoFormValues) => {
    const toastId = toast('Video', { position: 'top-right' });

    try {
      setVideo(undefined);

      toast.loading('Directing a movie...', {
        id: toastId,
        duration: 30000,
        cancel: { label: 'Dismiss', onClick: () => toast.dismiss(toastId) },
      });

      const response = await axios.post('/api/video', values);

      setVideo(response.data[0]);
      toast.dismiss(toastId);
      videoForm.reset();
    } catch (err: any) {
      // TODO: Open Pro Modal
      toast.error(err.message, { id: toastId });
      console.log(err);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Form {...videoForm}>
        <form
          onSubmit={videoForm.handleSubmit(onSubmit)}
          className='grid w-full grid-cols-6 gap-2 space-y-2 rounded-lg
          border p-4 px-3 focus-within:shadow-sm md:px-6 lg:space-y-0'
        >
          <FormField
            control={videoForm.control}
            name='prompt'
            render={({ field }) => (
              <FormItem className='col-span-6 lg:col-span-5'>
                <FormControl className='m-0 p-0'>
                  <Input
                    disabled={isLoading}
                    placeholder='Dog chasing its tail.'
                    className='border-0 px-2 outline-none 
                    focus-visible:ring-0 focus-visible:ring-transparent'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className='col-span-6 w-full lg:col-span-1'
            disabled={isLoading}
          >
            Generate
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VideoForm;
