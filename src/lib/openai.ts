import OpenAi from 'openai';

export const openai = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});
