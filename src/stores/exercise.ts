import { ref, watch, computed } from 'vue';
import { defineStore } from 'pinia';
import { useFile } from '@/composables/file';
import staticExerciseData from '@/exercise.json';
import { ExerciseSchema } from '@/schemas/exercise';
import type { ExerciseSchemaT } from '@/schemas/exercise';
import type { ValidModulesT } from '@/schemas/validModules';

export const useExerciseStore = defineStore('exercise', () => {
  const { file, status, writeFile } = useFile('exercise.json');

  const parsedExerciseData = ExerciseSchema.parse(staticExerciseData);

  // TODO: loading static data initially until there's something to make the initial exercise data
  const exercises = ref(parsedExerciseData);

  watch(file, (newFile) => {
    if (newFile) {
      exercises.value = ExerciseSchema.parse(newFile);
    }
  });

  const save = () => {
    if (exercises.value) {
      const json = JSON.stringify(exercises.value);
      writeFile(json);
    }
  };

  const getModuleData = <T extends ValidModulesT>(
    exerciseId: keyof ExerciseSchemaT,
    moduleName: T,
  ) =>
    computed<ExerciseSchemaT[string]['moduleData'][T]>(
      () => exercises.value[exerciseId]?.moduleData[moduleName],
    );

  return {
    exercises,
    status,
    save,
    getModuleData,
  };
});
