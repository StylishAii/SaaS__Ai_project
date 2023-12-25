import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { create } from 'zustand';

interface ConversationState {
  conversation: ChatCompletionMessageParam[];
  setConversation: (conversation: ChatCompletionMessageParam[]) => void;
  resetConversation: () => void;
}

export const useConversation = create<ConversationState>(set => ({
  conversation: [],
  setConversation: conversation => set(() => ({ conversation })),
  resetConversation: () => set(() => ({ conversation: [] })),
}));
