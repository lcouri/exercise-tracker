import * as z from 'zod';

export const ExerciseDetails = z.object({
  name: z.string(),
  groups: z.string().array(),
});
