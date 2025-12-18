'use server';

import { classifyProfile } from '@/ai/flows/classify-profile';
import { z } from 'zod';

const classifyActionSchema = z.object({
  profileDescription: z.string(),
  profileKeywords: z.array(z.string()),
});

export async function classifyProfileAction(formData: FormData) {
  try {
    const input = {
      profileDescription: formData.get('profileDescription') as string,
      profileKeywords: (formData.get('profileKeywords') as string).split(','),
    };

    const validatedInput = classifyActionSchema.parse(input);

    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = await classifyProfile({
      profileDescription: validatedInput.profileDescription,
      profileKeywords: validatedInput.profileKeywords.join(', '),
    });

    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, error: errorMessage };
  }
}
