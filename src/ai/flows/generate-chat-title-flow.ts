'use server';

/**
 * @fileOverview Generates a short title for a chat conversation.
 *
 * - generateChatTitle - A function that generates a title from the first message.
 */

import {ai} from '@/ai/genkit';
import {
  GenerateChatTitleInput,
  GenerateChatTitleInputSchema,
  GenerateChatTitleOutput,
  GenerateChatTitleOutputSchema,
} from './generate-chat-title-flow.schema';

export async function generateChatTitle(input: GenerateChatTitleInput): Promise<GenerateChatTitleOutput> {
  return generateChatTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateChatTitlePrompt',
  input: {schema: GenerateChatTitleInputSchema},
  output: {schema: GenerateChatTitleOutputSchema},
  prompt: `Generate a short, concise title (5 words or less) for a chat conversation that starts with this message:\n\n---\n{{{message}}}\n---\n\nTitle:`,
});

const generateChatTitleFlow = ai.defineFlow(
  {
    name: 'generateChatTitleFlow',
    inputSchema: GenerateChatTitleInputSchema,
    outputSchema: GenerateChatTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
