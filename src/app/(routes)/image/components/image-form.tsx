'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  ImageFormSchema,
  ImageFormValues,
  amountOptions,
  resolutionOptions,
} from '../data';

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

interface ImageFormProps {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}

const ImageForm = ({ images, setImages }: ImageFormProps) => {
  const router = useRouter();
  const imageForm = useForm<ImageFormValues>({
    resolver: zodResolver(ImageFormSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  // Loading State
  const isLoading = imageForm.formState.isSubmitting;

  const onSubmit = async (values: ImageFormValues) => {
    const toastId = toast('Image', { position: 'top-right' });

    try {
      setImages([]);

      toast.loading('ChatXYZ is drawing...', {
        id: toastId,
        duration: 30000,
        cancel: { label: 'Dismiss', onClick: () => toast.dismiss(toastId) },
      });

      const response = await axios.post('/api/image', values);

      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);

      if (response.status === 200) {
        toast.dismiss(toastId);
        imageForm.reset();
      } else {
        toast.error('Something went wrong.', {
          id: toastId,
        });
      }
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
      <Form {...imageForm}>
        <form
          onSubmit={imageForm.handleSubmit(onSubmit)}
          className='grid w-full grid-cols-6 gap-2 space-y-2 rounded-lg
          border p-4 px-3 focus-within:shadow-sm md:px-6 lg:space-y-0'
        >
          <FormField
            control={imageForm.control}
            name={'prompt'}
            render={({ field }) => (
              <FormItem className='col-span-6 lg:col-span-3'>
                <FormControl className='m-0 p-0'>
                  <Input
                    disabled={isLoading}
                    placeholder='Generate an image featuring a futuristic cityscape at night.'
                    className='border-0 px-2 outline-none focus-visible:ring-0 
                    focus-visible:ring-transparent'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={imageForm.control}
            name={'amount'}
            render={({ field }) => (
              <FormItem className='col-span-2 lg:col-span-1'>
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
                    {amountOptions.map((amount, index) => (
                      <SelectItem key={index} value={amount.value}>
                        {amount.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={imageForm.control}
            name={'resolution'}
            render={({ field }) => (
              <FormItem className='col-span-2 lg:col-span-1'>
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
                    {resolutionOptions.map((resolution, index) => (
                      <SelectItem key={index} value={resolution.value}>
                        {resolution.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button
            className='col-span-2 w-full lg:col-span-1'
            disabled={isLoading}
          >
            Generate
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ImageForm;
