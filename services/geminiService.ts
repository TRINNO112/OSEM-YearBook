// This service is currently deprecated as the application is using static yearbook data.
// It can be reactivated if dynamic story generation is needed in the future.

import { Story } from '../types';

export const generateStory = async (topic: string): Promise<Story> => {
  throw new Error("AI Generation is disabled for the Yearbook edition.");
};