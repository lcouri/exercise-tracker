import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useFile } from '@/composables/file';
import staticProgrammeData from '@/programme.json';
import type { ProgrammeJson } from '@/types/programme';

export const useProgrammeStore = defineStore('programme', () => {
  const { file, status } = useFile('programme.json');

  // note: value is only initialised by file right now, think about how/when to save changes
  const programme = ref<ProgrammeJson>(
    file.value ||
      // temp dummy data
      staticProgrammeData,
  );

  const save = () => {
    // no-op - implement later
  };

  return {
    programme,
    save,
    status,
  };
});
