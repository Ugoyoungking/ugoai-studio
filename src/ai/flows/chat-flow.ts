'use server';

/**
 * @fileOverview A simple chat flow.
 *
 * - chat - A function that handles the chat process.
 */

import {ai} from '@/ai/genkit';
import {ChatInput, ChatInputSchema, ChatOutput, ChatOutputSchema} from './chat-flow.schema';

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {history, message} = input;

    const result = await ai.generate({
      system:
        'You are a helpful AI assistant. Your response should be formatted with Markdown. You can use lists, tables, code blocks, and emojis to make your responses more engaging and clear.',
      history: history,
      prompt: message,
    });

    return {
      message: result.text,
    };
  }
);
