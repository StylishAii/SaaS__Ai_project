'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useConversation } from '@/hooks/useConversation';
import { ConversationFormSchema, ConversationFormValues } from '../data';

import TooltipWrapper from '@/components/tooltip-wrapper';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const ConversationForm = () => {
  const router = useRouter();
  const { conversation, setConversation } = useConversation();
  const conversationForm = useForm<ConversationFormValues>({
    resolver: zodResolver(ConversationFormSchema),
    defaultValues: {
      prompt: '',
    },
  });

  // Loading State
  const isLoading = conversationForm.formState.isSubmitting;

  const onSubmit = async (values: ConversationFormValues) => {
    const toastId = toast('Conversation', { position: 'top-right' });

    try {
      toast.loading('ChatXYZ is thinking...', {
        id: toastId,
        duration: 30000,
        cancel: { label: 'Dismiss', onClick: () => toast.dismiss(toastId) },
      });

      const userMessage: ChatCompletionMessageParam = {
        role: 'user',
        content: values.prompt,
      };

      const newMessages = [...conversation, userMessage];

      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      });

      if (response.status === 200) {
        toast.dismiss(toastId);
        setConversation([...newMessages, response.data]);
        conversationForm.reset();
      } else {
        toast.error('Something went wrong.', {
          id: toastId,
        });
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
      console.log(err);
    } finally {
      router.refresh();
    }
  };

  return (
    <Form {...conversationForm}>
      <form
        onSubmit={conversationForm.handleSubmit(onSubmit)}
        className='grid w-full grid-cols-6 gap-2 space-y-2 rounded-lg
          border px-3 py-2 focus-within:shadow-sm md:space-y-0 md:px-4'
      >
        <FormField
          control={conversationForm.control}
          name='prompt'
          render={({ field }) => (
            <FormItem className='col-span-6 md:col-span-5'>
              <FormControl className='m-0 p-0'>
                <div className='relative flex w-full'>
                  <Input
                    disabled={isLoading}
                    placeholder='How do I calculate the perimeter of a circle?'
                    className='border-0 px-2 pr-16 outline-none focus-visible:ring-0 
                    focus-visible:ring-transparent sm:pr-0'
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
  );
};

export default ConversationForm;
