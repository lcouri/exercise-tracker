import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useFile } from '@/composables/file'
import staticExerciseData from '@/exercise.json'
import type { Exercise, ExerciseBase, ExerciseJson } from '@/types/exercise'

type CombinedExercises = {
  [id: string]: Exercise
}

const combineExercises = (exerciseJson: ExerciseJson): CombinedExercises =>
  Object.entries(exerciseJson).reduce<CombinedExercises>((acc, [id, ex]) => {
    if (ex.exerciseType === 'variation') {
      const parEx = exerciseJson[ex.baseId] as ExerciseBase
      const notes = [...(parEx.notes || []), ...(ex.notes || [])]

      acc[id] = {
        ...parEx,
        ...ex,
        notes,
      }
    } else {
      acc[id] = ex
    }
    return acc
  }, {})

export const useExerciseStore = defineStore('exercise', () => {
  const { file, status } = useFile('exercise.json')

  // note: value is only initialised by file right now, think about how/when to save changes
  const exercises = ref<CombinedExercises>(
    file.value
      ? combineExercises(file.value)
      : // temp dummy data
        combineExercises(staticExerciseData as ExerciseJson),
  )

  return {
    exercises,
    status,
  }
})
