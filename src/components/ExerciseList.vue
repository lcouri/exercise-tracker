<script setup lang="ts">
import { ref } from 'vue';

type Props = {
  exercises: { name: string, weight: number, sets_x_reps: string, notes?: string }[];
};

const props = defineProps<Props>();

const expandExercise = ref<string | null>(null);

const toggleExpand = (name: string) => expandExercise.value = expandExercise.value ? null : name;
</script>

<template>
  <div class="exercises">
    <template v-for="ex in exercises" :key="ex.name">
      <button class="exercise-item" @click="toggleExpand(ex.name)">
        <div>{{ ex.weight }}kg</div>
        <div>{{ ex.sets_x_reps }}</div>
        <div>{{ ex.name }}{{ ex.notes ? '*' : '' }}</div>
      </button>
      <div v-if="expandExercise === ex.name" class="expand">
        <div>
          <button>+</button>
          1 / 5
          <button>-</button>
        </div>
        <div>
          <button>+2.5kg</button>
          <button>+5kg</button>
          <button>+custom</button>
        </div>
        <div>
          <button>Change set/reps</button>
        </div>
        <div>
          <button>done</button>
        </div>
        <p>{{ ex.notes }}</p>
      </div>
    </template>
  </div>
</template>

<style>
.exercises {
  list-style: none;
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
  grid-gap: 0.5rem 0;
}

.exercise-item {
  display: contents;
  font-family: sans-serif;
  font-size: 1rem;
  text-align: start;
}

.expand {
  grid-column: span 3;
}
</style>
