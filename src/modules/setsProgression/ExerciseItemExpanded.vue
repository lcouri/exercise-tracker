<script setup lang="ts">
import { computed, ref } from 'vue';
import { useExerciseStore } from '@/stores/exercise';
import setsProgressionData from './setsProgression.json';

type Props = {
  exerciseId: string;
};

const props = defineProps<Props>();

const exerciseStore = useExerciseStore();

const userData = exerciseStore.getModuleData(props.exerciseId, 'setsProgression');

const currentProgression = computed(() =>
  userData.value ? setsProgressionData[userData.value.progression][userData.value.index] : null,
);

const currentSetNumber = ref<number>(0);

const nextProgression = () => {
  if (
    exerciseStore.exercises?.[props.exerciseId]?.moduleData['setsProgression']?.index != null &&
    exerciseStore.exercises[props.exerciseId]!.moduleData.setsProgression!.index < 2
  ) {
    exerciseStore.exercises[props.exerciseId]!.moduleData.setsProgression!.index += 1;
  }
};
</script>

<template>
  <div v-if="!userData">Error loading Set Progression module</div>
  <template v-else>
    <div>
      <button @click="currentSetNumber -= 1">-</button>
      {{ `${currentSetNumber} / ${currentProgression?.sets}` }}
      <button @click="currentSetNumber += 1">+</button>
    </div>
    <div>
      <button @click="nextProgression">Next set progression</button>
    </div>
  </template>
</template>

<style></style>
