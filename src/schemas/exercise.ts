import * as z from 'zod';
import { validModules } from './validModules';
import { exerciseDataSchema as setsProgressionSchema } from '@/modules/setsProgression/schema';

export const ExerciseDetailsSchema = z.object({
  name: z.string(),
  modules: z.literal(validModules).array(),
  moduleData: z.object({
    setsProgression: setsProgressionSchema.optional(),
  }),
});

export const ExerciseSchema = z.record(z.string(), ExerciseDetailsSchema);

export type ExerciseDetailsSchemaT = z.infer<typeof ExerciseDetailsSchema>;
export type ExerciseSchemaT = z.infer<typeof ExerciseSchema>;
