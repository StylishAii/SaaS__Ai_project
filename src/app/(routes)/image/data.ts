import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import * as z from 'zod';

export const imageGenerationSetting: ChatCompletionMessageParam = {
  role: 'system',
  content:
    'You are a code generator. Your must answer only in markdown code snippets. Use code comments in point form for explanations.',
};

export const ImageFormSchema = z.object({
  prompt: z.string().min(1, { message: 'Image prompt is required.' }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  { value: '1', label: '1 Photo' },
  { value: '2', label: '2 Photos' },
  { value: '3', label: '3 Photos' },
  { value: '4', label: '4 Photos' },
  { value: '5', label: '5 Photos' },
] as const;

export type Amount = (typeof amountOptions)[number]['value'];

export const resolutionOptions = [
  { value: '256x256 dall-e-2', label: '256x256 (v2)' },
  { value: '512x512 dall-e-2', label: '512x512 (v2)' },
  { value: '1024x1024 dall-e-2', label: '1024x1024 (v2)' },
  { value: '1024x1024 dall-e-3', label: '1024x1024 (v3)' },
  { value: '1792x1024 dall-e-3', label: '1792x1024 (v3)' },
  { value: '1024x1792 dall-e-3', label: '1024x1792 (v3)' },
] as const;

export type Resolution = (typeof resolutionOptions)[number]['value'];

export type ImageFormValues = z.infer<typeof ImageFormSchema>;
