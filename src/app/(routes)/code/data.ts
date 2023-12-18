import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import * as z from 'zod';

export const codeGenerationSetting: ChatCompletionMessageParam = {
  role: 'system',
  content:
    'You are a code generator. Your must answer only in markdown code snippets. Use code comments in point form for explanations.',
};

export const CodeFormSchema = z.object({
  prompt: z.string().min(1, { message: 'Prompt is required.' }),
});

export type CodeFormValues = z.infer<typeof CodeFormSchema>;
