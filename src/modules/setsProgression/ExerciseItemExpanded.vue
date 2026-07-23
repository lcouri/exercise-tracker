<script setup lang="ts">
import { computed, ref } from 'vue';
import { useExerciseStore } from '@/stores/exercise';
import setProgressionData from './setProgression.json';

type Props = {
  exerciseId: string;
};

const props = defineProps<Props>();

const exerciseStore = useExerciseStore();

const userData = computed(
  () => (exerciseStore.exercises?.[props.exerciseId] as any)?.moduleData['setsProgression'],
);
const currentProgression = computed(() =>
  userData.value
    ? (setProgressionData as any)[userData.value.progression][userData.value.index]
    : null,
);

const currentSetNumber = ref<number>(0);

const nextProgression = () => {
  if (userData.value.index < 2) {
    userData.value.index += 1;
  }
};
</script>

<template>
  <div v-if="!userData">Error loading Set Progression module</div>
  <template v-else>
    <div>
      <button @click="currentSetNumber -= 1">-</button>
      {{ `${currentSetNumber} / ${currentProgression.sets}` }}
      <button @click="currentSetNumber += 1">+</button>
    </div>
    <div>
      <button @click="nextProgression">Next set progression</button>
    </div>
  </template>
</template>

<style></style>
