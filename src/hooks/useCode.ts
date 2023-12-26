import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { create } from 'zustand';

interface CodeState {
  code: ChatCompletionMessageParam[];
  setCode: (code: ChatCompletionMessageParam[]) => void;
  resetCode: () => void;
}

export const useCode = create<CodeState>(set => ({
  code: [],
  setCode: code => set(() => ({ code })),
  resetCode: () => set(() => ({ code: [] })),
}));
