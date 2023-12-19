import * as z from 'zod';

export const VideoFormSchema = z.object({
  prompt: z.string().min(1, { message: 'Video prompt is required.' }),
});

export type VideoFormValues = z.infer<typeof VideoFormSchema>;
