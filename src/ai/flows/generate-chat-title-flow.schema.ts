import {z} from 'genkit';

export const GenerateChatTitleInputSchema = z.object({
  message: z.string().describe('The initial message of a chat conversation.'),
});
export type GenerateChatTitleInput = z.infer<typeof GenerateChatTitleInputSchema>;

export const GenerateChatTitleOutputSchema = z.object({
  title: z.string().describe('A short, descriptive title for the chat (5 words max).'),
});
export type GenerateChatTitleOutput = z.infer<typeof GenerateChatTitleOutputSchema>;
