import * as z from 'zod';

// TODO: might want to add custom progressions
// would be saved as part of user data
export const exerciseDataSchema = z.object({
  progression: z.literal('t1', 't2'), // should be based on what's in the progression
  index: z.number(), // should be limited to options in the progression
});

export type ExerciseDataSchemaT = z.infer<typeof exerciseDataSchema>;
