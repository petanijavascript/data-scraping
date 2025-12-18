'use server';
/**
 * @fileOverview A profile categorization AI agent.
 *
 * - classifyProfile - A function that handles the profile categorization process.
 * - ClassifyProfileInput - The input type for the classifyProfile function.
 * - ClassifyProfileOutput - The return type for the classifyProfile function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyProfileInputSchema = z.object({
  profileDescription: z.string().describe('The description of the profile.'),
  profileKeywords: z.string().describe('Keywords associated with the profile.'),
});
export type ClassifyProfileInput = z.infer<typeof ClassifyProfileInputSchema>;

const ClassifyProfileOutputSchema = z.object({
  category: z.string().describe('The predicted category of the profile.'),
  confidence: z.number().describe('The confidence level of the category prediction (0-1).'),
});
export type ClassifyProfileOutput = z.infer<typeof ClassifyProfileOutputSchema>;

export async function classifyProfile(input: ClassifyProfileInput): Promise<ClassifyProfileOutput> {
  return classifyProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyProfilePrompt',
  input: {schema: ClassifyProfileInputSchema},
  output: {schema: ClassifyProfileOutputSchema},
  prompt: `You are an expert in social media profile categorization.

  Given the following profile description and keywords, determine the most appropriate category for the profile.
  Also, provide a confidence level for your prediction between 0 and 1.

  Description: {{{profileDescription}}}
  Keywords: {{{profileKeywords}}}

  Format your response as a JSON object with "category" and "confidence" fields.
  `,
});

const classifyProfileFlow = ai.defineFlow(
  {
    name: 'classifyProfileFlow',
    inputSchema: ClassifyProfileInputSchema,
    outputSchema: ClassifyProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
