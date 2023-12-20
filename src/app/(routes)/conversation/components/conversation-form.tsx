'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ConversationFormSchema, ConversationFormValues } from '../data';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface ConversationFormProps {
  messages: ChatCompletionMessageParam[];
  setMessages: Dispatch<SetStateAction<ChatCompletionMessageParam[]>>;
}

const ConversationForm = ({ messages, setMessages }: ConversationFormProps) => {
  const router = useRouter();
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

      const newMessages = [...messages, userMessage];

      const response = await axios.post('/api/conversation', {
        messages: newMessages,
      });

      if (response.status === 200) {
        toast.dismiss(toastId);
        setMessages(current => [...current, userMessage, response.data]);
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
    <div>
      <Form {...conversationForm}>
        <form
          onSubmit={conversationForm.handleSubmit(onSubmit)}
          className='grid w-full grid-cols-6 gap-2 space-y-2 rounded-lg
          border p-4 px-3 focus-within:shadow-sm md:px-6 lg:space-y-0'
        >
          <FormField
            control={conversationForm.control}
            name='prompt'
            render={({ field }) => (
              <FormItem className='col-span-6 lg:col-span-5'>
                <FormControl className='m-0 p-0'>
                  <Input
                    disabled={isLoading}
                    placeholder='How do I calculate the perimeter of a circle?'
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

export default ConversationForm;
