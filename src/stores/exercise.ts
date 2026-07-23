import { ref, toRaw, watch } from 'vue';
import { defineStore } from 'pinia';
import { useFile } from '@/composables/file';
import staticExerciseData from '@/exercise.json';
import type { Exercise, ExerciseBase, ExerciseVariation, ExerciseJson } from '@/types/exercise';

type CombinedExercises = {
  [id: string]: Exercise;
};

const combineExercises = (exerciseJson: ExerciseJson): CombinedExercises =>
  Object.entries(exerciseJson).reduce<CombinedExercises>((acc, [id, ex]) => {
    if (ex.exerciseType === 'variation') {
      const parEx = exerciseJson[ex.baseId] as ExerciseBase;
      const notes = [...(parEx.notes || []), ...(ex.notes || [])];

      acc[id] = {
        ...parEx,
        ...ex,
        notes,
      };
    } else {
      acc[id] = ex;
    }
    return acc;
  }, {});

const uncombineExercises = (exercises: CombinedExercises): ExerciseJson =>
  Object.entries(exercises).reduce<ExerciseJson>((acc, [id, ex]) => {
    if (ex.exerciseType === 'variation') {
      const parEx = exercises[ex.baseId!] as ExerciseBase;

      acc[id] = Object.entries(ex).reduce((acc, [k, v]) => {
        const parExVal = parEx[k as keyof ExerciseBase];
        if (parExVal) {
          if (k === 'notes') {
            acc[k] = (parExVal as string[]).slice(-1);
          } else if (parExVal !== v) {
            // TODO: Object.entries and .reduce remove the relation between key and value,
            // and the more specific types they have. These functions are a stop-gap, so I don't
            // want to deal with this properly unless I have to.
            // @ts-expect-error
            acc[k] = parExVal;
          }
        }
        return acc;
      }, {} as ExerciseVariation);
    } else {
      acc[id] = ex as ExerciseBase;
    }
    return acc;
  }, {});

export const useExerciseStore = defineStore('exercise', () => {
  const { file, status, writeFile } = useFile('exercise.json');

  watch(
    () => file.value,
    (newFile) => {
      if (newFile) {
        exercises.value = combineExercises(toRaw(newFile));
      }
    },
  );

  // TODO: loading static data initially until there's something to make the initial exercise data
  const exercises = ref<CombinedExercises | undefined>(
    combineExercises(staticExerciseData as any),
  );

  const save = () => {
    if (exercises.value) {
      const uncombinedExercises = uncombineExercises(exercises.value);

      const json = JSON.stringify(uncombinedExercises);
      writeFile(json);
    }
  };

  return {
    exercises,
    status,
    save,
  };
});
