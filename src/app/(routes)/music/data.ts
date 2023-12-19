import * as z from 'zod';

export const MusicFormSchema = z.object({
  prompt: z.string().min(1, { message: 'Music prompt is required.' }),
  length: z.string().min(1),
});

export type MusicFormValues = z.infer<typeof MusicFormSchema>;

export const audioLengthOptions = [
  { value: '5', label: '5 Seconds' },
  { value: '6', label: '6 Seconds' },
  { value: '7', label: '7 Seconds' },
  { value: '8', label: '8 Seconds' },
  { value: '9', label: '9 Seconds' },
  { value: '10', label: '10 Seconds' },
  { value: '11', label: '11 Seconds' },
  { value: '12', label: '12 Seconds' },
  { value: '13', label: '13 Seconds' },
  { value: '14', label: '14 Seconds' },
  { value: '15', label: '15 Seconds' },
] as const;

export type AudioLength = typeof audioLengthOptions[number]['value'];
