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
import {PDFDocument, rgb, StandardFonts} from 'pdf-lib';

const GeneratePdfFromTextInputSchema = z.object({
  textPrompt: z.string().describe('The text prompt to use for generating the PDF document.'),
});
export type GeneratePdfFromTextInput = z.infer<typeof GeneratePdfFromTextInputSchema>;

const GeneratePdfFromTextOutputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "The generated PDF document as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
});
export type GeneratePdfFromTextOutput = z.infer<typeof GeneratePdfFromTextOutputSchema>;

export async function generatePdfFromText(input: GeneratePdfFromTextInput): Promise<GeneratePdfFromTextOutput> {
  return generatePdfFromTextFlow(input);
}

const PdfGenerationPromptInputSchema = z.object({prompt: z.string()});
const PdfGenerationPromptOutputSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const pdfGenerationPrompt = ai.definePrompt(
  {
    name: 'pdfGenerationPrompt',
    input: {schema: PdfGenerationPromptInputSchema},
    output: {
      schema: PdfGenerationPromptOutputSchema,
    },
    prompt: `You are an AI that generates content for a PDF document based on a text prompt.
  Generate a title and content for a PDF based on the following prompt:
  {{{prompt}}}`,
  }
);

const generatePdfFromTextFlow = ai.defineFlow(
  {
    name: 'generatePdfFromTextFlow',
    inputSchema: GeneratePdfFromTextInputSchema,
    outputSchema: GeneratePdfFromTextOutputSchema,
  },
  async (input: GeneratePdfFromTextInput): Promise<GeneratePdfFromTextOutput> => {
    const {output} = await pdfGenerationPrompt({prompt: input.textPrompt});

    if (!output) {
      throw new Error('Failed to generate PDF content.');
    }

    const {title, content} = output;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const {width, height} = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const fontSize = 12;
    const titleFontSize = 24;
    const margin = 50;

    page.drawText(title, {
      x: margin,
      y: height - margin - titleFontSize,
      font: titleFont,
      size: titleFontSize,
      color: rgb(0, 0, 0),
    });

    const lines = content.split('\n');
    let y = height - margin - titleFontSize - 30;

    for (const line of lines) {
      if (y < margin) {
        const newPage = pdfDoc.addPage();
        y = newPage.getSize().height - margin;
      }
      page.drawText(line, {
        x: margin,
        y,
        font,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      y -= fontSize + 5;
    }

    const pdfBytes = await pdfDoc.save();
    const pdfDataUri = `data:application/pdf;base64,${Buffer.from(pdfBytes).toString('base64')}`;

    return {pdfDataUri};
  }
);
