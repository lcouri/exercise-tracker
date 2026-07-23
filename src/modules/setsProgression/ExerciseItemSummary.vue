<script setup lang="ts">
import { computed } from 'vue';
import { useExerciseStore } from '@/stores/exercise';
import setProgressionData from './setProgression.json';

type Props = {
  exerciseId: string;
};

const props = defineProps<Props>();

const exerciseStore = useExerciseStore();

const userData = computed(() =>
  (exerciseStore.exercises?.[props.exerciseId] as any)?.moduleData['setsProgression']
);
const currentProgression = computed(() =>
  userData.value
    ? (setProgressionData as any)[userData.value.progression][userData.value.index]
    : null,
);
</script>

<template>
  <div v-if="!userData">Error loading Set Progression module</div>
  <template v-else>
    <div>
      {{ `${currentProgression.sets}x${currentProgression.reps}` }}
    </div>
  </template>
</template>

<style></style>
