'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const conversationFormSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt is required.' }),
});

type ConversationFormValues = z.infer<typeof conversationFormSchema>;

const ConversationForm = () => {
  const conversationForm = useForm<ConversationFormValues>({
    resolver: zodResolver(conversationFormSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = conversationForm.formState.isSubmitting;

  const onSubmit = async (values: ConversationFormValues) => {
    console.log(values);
  };

  return (
    <div>
      <Form {...conversationForm}>
        <form
          onSubmit={conversationForm.handleSubmit(onSubmit)}
          className='rounded-lg border w-full p-4 px-3 md:px-6
          focus-within:shadow-sm grid grid-cols-12 gap-2 space-y-2 lg:space-y-0'
        >
          <FormField
            control={conversationForm.control}
            name='prompt'
            render={({ field }) => (
              <FormItem className='col-span-12 lg:col-span-10'>
                <FormControl className='m-0 p-0'>
                  <Input
                    disabled={isLoading}
                    placeholder='How do I calculate the perimeter of a circle?'
                    className='border-0 outline-none focus-visible:ring-0 
                    focus-visible:ring-transparent px-2'
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className='col-span-12 lg:col-span-2 w-full'
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
