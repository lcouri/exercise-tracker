<script setup lang="ts">
import { computed, ref } from 'vue';
import { useExerciseStore } from '@/stores/exercise';
import ModuleComponent from '@/moduleLoader/ModuleComponent.vue';

type Props = {
  exerciseId: string;
};

const props = defineProps<Props>();

const exerciseStore = useExerciseStore();

// shortcut to referenced exercise
const exercise = computed<any>(() => exerciseStore.exercises?.[props.exerciseId]);

const toggleExpand = ref<boolean>(false);
</script>

<template>
  <div>
    <div v-if="!exercise">Error</div>
    <template v-else>
      <button class="exercise-button" @click="toggleExpand = !toggleExpand">
        <div>{{ exercise.name }}</div>
        <template v-for="mod in exercise.modules" :key="mod">
          <ModuleComponent :module="mod" component="ExerciseItemSummary" :exerciseId="props.exerciseId" />
        </template>
      </button>
      <div v-if="toggleExpand" class="expand">
        <template v-for="mod in exercise.modules" :key="mod">
          <ModuleComponent :module="mod" component="ExerciseItemExpanded" :exerciseId="props.exerciseId" />
        </template>
        <button @click="exerciseStore.save">Save</button>
      </div>
    </template>
  </div>
</template>

<style>
.exercise-button {
  display: flex;
  font-family: sans-serif;
  font-size: 1rem;
  text-align: start;
}

.expand {
  grid-column: span 3;
}

.notes {
  max-height: 50vh;
  overflow: auto;
}

.edit-button {
  position: sticky;
  bottom: 0;

  & > button {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
