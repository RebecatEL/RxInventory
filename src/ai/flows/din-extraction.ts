'use server';

/**
 * @fileOverview Extracts the DIN (Drug Identification Number) from an image.
 *
 * - extractDinFromImage - Extracts the DIN from an image.
 * - ExtractDinFromImageInput - The input type for the extractDinFromImage function.
 * - ExtractDinFromImageOutput - The return type for the extractDinFromImage function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ExtractDinFromImageInputSchema = z.object({
  imageURL: z.string().describe('The URL of the image containing the DIN.'),
});
export type ExtractDinFromImageInput = z.infer<typeof ExtractDinFromImageInputSchema>;

const ExtractDinFromImageOutputSchema = z.object({
  din: z.string().describe('The extracted DIN number.'),
});
export type ExtractDinFromImageOutput = z.infer<typeof ExtractDinFromImageOutputSchema>;

export async function extractDinFromImage(input: ExtractDinFromImageInput): Promise<ExtractDinFromImageOutput> {
  return extractDinFromImageFlow(input);
}

const extractDinPrompt = ai.definePrompt({
  name: 'extractDinPrompt',
  input: {
    schema: z.object({
      imageURL: z.string().describe('The URL of the image.'),
    }),
  },
  output: {
    schema: z.object({
      din: z.string().describe('The extracted DIN number.'),
    }),
  },
  prompt: `Extract the 8 digit Drug Identification Number (DIN) from the following image. The DIN will be preceded by the characters \"DIN\".

Image: {{media url=imageURL}}

Return only the 8 digit DIN number.
`,
});

const extractDinFromImageFlow = ai.defineFlow<
  typeof ExtractDinFromImageInputSchema,
  typeof ExtractDinFromImageOutputSchema
>(
  {
    name: 'extractDinFromImageFlow',
    inputSchema: ExtractDinFromImageInputSchema,
    outputSchema: ExtractDinFromImageOutputSchema,
  },
  async input => {
    const {output} = await extractDinPrompt(input);
    return output!;
  }
);
