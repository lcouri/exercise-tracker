import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

import type { ExerciseJson } from '@/types/exercise'
import type { ProgrammeJson } from '@/types/programme'
import { ref } from 'vue'
import type { Status } from '@/types/status'

const EXERCISE_FILE = 'exercise.json'
const PROGRAMME_FILE = 'programme.json'

type ValidFiles = typeof EXERCISE_FILE | typeof PROGRAMME_FILE

export const useFile = <T extends ValidFiles>(filePath: T) => {
  const status = ref<Status>('init')
  const file = ref<T extends typeof EXERCISE_FILE ? ExerciseJson : ProgrammeJson>()

  const writeFile = async (data: string) => {
    await Filesystem.writeFile({
      path: filePath,
      data,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    })
  }

  const readFile = async () => {
    status.value = 'loading'

    try {
      const contents = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      })
      file.value = JSON.parse(String(contents.data))
    } catch (e) {
      status.value = 'error'
    } finally {
      status.value = 'done'
    }
  }
  readFile()

  return {
    readFile,
    writeFile,
    file,
    status,
  }
}
