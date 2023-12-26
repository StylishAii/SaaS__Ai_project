'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ArrowUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { useEffect, useState } from 'react';
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
  const [isMounted, setIsMounted] = useState(false);
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
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: 'user',
        content: values.prompt,
      };

      const newMessages = [...conversation, userMessage];

      const responsePromise = axios.post('/api/conversation', {
        messages: newMessages,
      });

      toast.promise(responsePromise, {
        id: 'Conversation',
        position: 'top-right',
        loading: 'ChatXYZ is thinking...',
        error: 'Something went wrong.',
      });

      const response = await responsePromise;

      if (response.status === 200) {
        setConversation([...newMessages, response.data]);
        conversationForm.reset();
      }
    } catch (err: any) {
      toast.error(err.message);
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
