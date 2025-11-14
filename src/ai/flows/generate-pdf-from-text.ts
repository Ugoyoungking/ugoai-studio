'use server';

/**
 * @fileOverview Generates a PDF document from a text prompt.
 *
 * - generatePdfFromText - A function that handles the PDF generation process.
 * - GeneratePdfFromTextInput - The input type for the generatePdfFromText function.
 * - GeneratePdfFromTextOutput - The return type for the generatePdfFromText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePdfFromTextInputSchema = z.object({
  textPrompt: z.string().describe('The text prompt to use for generating the PDF document.'),
});
export type GeneratePdfFromTextInput = z.infer<typeof GeneratePdfFromTextInputSchema>;

const GeneratePdfFromTextOutputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      'The generated PDF document as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected typo here
    ),
});
export type GeneratePdfFromTextOutput = z.infer<typeof GeneratePdfFromTextOutputSchema>;

export async function generatePdfFromText(input: GeneratePdfFromTextInput): Promise<GeneratePdfFromTextOutput> {
  return generatePdfFromTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePdfFromTextPrompt',
  input: {schema: GeneratePdfFromTextInputSchema},
  output: {schema: GeneratePdfFromTextOutputSchema},
  prompt: `You are an AI that generates PDF documents from text prompts. The PDF document must be returned as a base64 encoded data URI.

  Generate a PDF document from the following text prompt: {{{textPrompt}}}`,
});

const generatePdfFromTextFlow = ai.defineFlow(
  {
    name: 'generatePdfFromTextFlow',
    inputSchema: GeneratePdfFromTextInputSchema,
    outputSchema: GeneratePdfFromTextOutputSchema,
  },
  async input => {
    // TODO: Implement the logic to convert the text prompt to a PDF document.
    // This will likely involve using a library like pdfmake or jsPDF.
    // For now, we'll just return a placeholder data URI.

    // const pdfData = await generatePdf(input.textPrompt);
    // return {pdfDataUri: pdfData};
    // Generating a dummy pdf, so that the app does not fail, this needs to be implemented.
    const dummyPdfDataUri = 'data:application/pdf;base64,JVBERi0xLg==';
    const {output} = await prompt(input);

    return {pdfDataUri: dummyPdfDataUri};
  }
);
