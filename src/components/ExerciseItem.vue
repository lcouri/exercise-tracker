<script setup lang="ts">
import { computed } from 'vue';
import { useExerciseStore } from '@/stores/exercise';
import ModuleComponent from '@/moduleLoader/ModuleComponent.vue';

type Props = {
  exerciseId: string;
};

const props = defineProps<Props>();

const exerciseStore = useExerciseStore();

// shortcut to referenced exercise
const exercise = computed(() => exerciseStore.exercises?.[props.exerciseId]);
</script>

<template>
  <div v-if="!exercise">Error</div>
  <template v-else>
    <details class="exercise-details">
      <summary class="exercise-summary">
        <div>
          {{ exercise.name }}
        </div>
        <template v-for="mod in exercise.modules" :key="mod">
          <ModuleComponent
            :module="mod"
            component="ExerciseItemSummary"
            :exerciseId="props.exerciseId"
          />
        </template>
      </summary>
      <template v-for="mod in exercise.modules" :key="mod">
        <ModuleComponent
          :module="mod"
          component="ExerciseItemDetails"
          :exerciseId="props.exerciseId"
        />
      </template>
      <button @click="exerciseStore.save">Save</button>
    </details>
  </template>
</template>

<style>
.exercise-details {
  border: 1px solid black;
  padding: 0 0.5rem;
}

.exercise-details[open] {
  padding-bottom: 0.5rem;
}

.exercise-summary {
  display: flex;
  gap: 1rem;
  font-family: sans-serif;
  padding: 0.5rem;
  margin: 0 -0.5rem;
}

.exercise-details[open] .exercise-summary {
  border-bottom: 1px solid black;
  margin: 0 -0.5rem 0.5rem;
}
</style>
