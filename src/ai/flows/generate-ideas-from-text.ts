'use server';

/**
 * @fileOverview Generates a list of related ideas from a given text prompt.
 *
 * - generateIdeas - A function that accepts a text prompt and returns a list of ideas.
 * - GenerateIdeasInput - The input type for the generateIdeas function.
 * - GenerateIdeasOutput - The return type for the generateIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIdeasInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate ideas from.'),
});
export type GenerateIdeasInput = z.infer<typeof GenerateIdeasInputSchema>;

const GenerateIdeasOutputSchema = z.object({
  ideas: z.array(z.string()).describe('A list of related ideas generated from the prompt.'),
});
export type GenerateIdeasOutput = z.infer<typeof GenerateIdeasOutputSchema>;

export async function generateIdeas(input: GenerateIdeasInput): Promise<GenerateIdeasOutput> {
  return generateIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIdeasPrompt',
  input: {schema: GenerateIdeasInputSchema},
  output: {schema: GenerateIdeasOutputSchema},
  prompt: `You are a brainstorming assistant. Generate a list of related ideas based on the following prompt.\n\nPrompt: {{{prompt}}}\n\nIdeas:`,
});

const generateIdeasFlow = ai.defineFlow(
  {
    name: 'generateIdeasFlow',
    inputSchema: GenerateIdeasInputSchema,
    outputSchema: GenerateIdeasOutputSchema,
  },
  async (input: GenerateIdeasInput): Promise<GenerateIdeasOutput> => {
    const {output} = await prompt(input);
    return output!;
  }
);
