/**
 * @fileOverview Explains the content of a PDF file in a simplified manner.
 *
 * - explainPdfContent - A function that handles the PDF content explanation process.
 * - ExplainPdfContentInput - The input type for the explainPdfContent function.
 * - ExplainPdfContentOutput - The return type for the explainPdfContent function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainPdfContentInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExplainPdfContentInput = z.infer<typeof ExplainPdfContentInputSchema>;

const ExplainPdfContentOutputSchema = z.object({
  explanation: z.string().describe('A simplified explanation of the PDF content.'),
});
export type ExplainPdfContentOutput = z.infer<typeof ExplainPdfContentOutputSchema>;

export async function explainPdfContent(input: ExplainPdfContentInput): Promise<ExplainPdfContentOutput> {
  return explainPdfContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainPdfContentPrompt',
  input: {schema: ExplainPdfContentInputSchema},
  output: {schema: ExplainPdfContentOutputSchema},
  prompt: `You are an expert AI assistant that simplifies complex documents.

You will receive the content of a PDF document and explain it in a simplified manner so that anyone can understand it.

PDF Content: {{media url=pdfDataUri}}`,
});

const explainPdfContentFlow = ai.defineFlow(
  {
    name: 'explainPdfContentFlow',
    inputSchema: ExplainPdfContentInputSchema,
    outputSchema: ExplainPdfContentOutputSchema,
  },
  async (input: ExplainPdfContentInput): Promise<ExplainPdfContentOutput> => {
    const {output} = await prompt(input);
    return output!;
  }
);
