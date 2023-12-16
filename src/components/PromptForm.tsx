'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt is required.' }),
});

type FormValues = z.infer<typeof formSchema>;

const PromptForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  return <div>PromptForm</div>;
};

export default PromptForm;
