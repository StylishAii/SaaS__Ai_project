'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { VideoFormSchema, VideoFormValues } from '../data';

import TooltipWrapper from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface VideoFormProps {
  setVideo: Dispatch<SetStateAction<string | undefined>>;
}

const VideoForm = ({ setVideo }: VideoFormProps) => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
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
      toast.error(err.message, { id: toastId });
      console.log(err);
    } finally {
      router.refresh();
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Form {...videoForm}>
        <form
          onSubmit={videoForm.handleSubmit(onSubmit)}
          className='grid w-full grid-cols-6 gap-2 rounded-lg
          border px-3 py-2 focus-within:shadow-sm md:px-4'
        >
          <FormField
            control={videoForm.control}
            name='prompt'
            render={({ field }) => (
              <FormItem className='col-span-6 md:col-span-5'>
                <FormControl className='m-0 p-0'>
                  <div className='relative flex w-full'>
                    <Input
                      disabled={isLoading}
                      placeholder='Dog chasing its tail.'
                      className='border-0 px-2 outline-none 
                      focus-visible:ring-0 focus-visible:ring-transparent'
                      {...field}
                    />
                    <TooltipWrapper tooltip={'Generate'}>
                      <Button
                        className='absolute right-1 top-1 flex md:right-0 md:top-0 
                        md:hidden'
                        variant={'outline'}
                        size={'icon'}
                        disabled={isLoading}
                        type='submit'
                      >
                        <ArrowUpIcon />
                      </Button>
                    </TooltipWrapper>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className='hidden md:block'
            variant={'default'}
            size={'default'}
            disabled={isLoading}
            type={'submit'}
          >
            Generate
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VideoForm;
