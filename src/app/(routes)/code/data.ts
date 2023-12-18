import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

export const codeAssistantSetting: ChatCompletionMessageParam = {
  role: 'system',
  content:
    'You are a code generator. Your must answer only in markdown code snippets. Use code comments in point form for explanations.',
};
