import * as z from 'zod';

export const SettingsFormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  about: z.string(),
});

export type SettingsFormValues = z.infer<typeof SettingsFormSchema>;
