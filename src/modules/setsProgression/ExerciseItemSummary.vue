<script setup lang="ts">
import { computed } from 'vue';
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
</script>

<template>
  <div v-if="!userData">Error loading Set Progression module</div>
  <template v-else>
    <div>
      {{ `${currentProgression?.sets}x${currentProgression?.reps}` }}
    </div>
  </template>
</template>

<style></style>
