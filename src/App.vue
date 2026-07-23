<script setup lang="ts">
import { ref, computed } from 'vue';
import data from './data.json';
import ExerciseList from './components/ExerciseList.vue';

const exerciseDay = ref(data[0]);

const exerciseDaySelect = computed({
  get: () => exerciseDay.value?.name,
  set: (newName) => exerciseDay.value = data.find((e) => e.name === newName),
})
</script>

<template>
  <h1 hidden>Exercise Tracker</h1>
  <select v-model="exerciseDaySelect" class="day-select">
    <option v-for="ex in data" :key="ex.name" :value="ex.name" :selected="ex.name === exerciseDaySelect">{{ ex.name }} (started 05/14)</option>
  </select>
  <p>Did "Day 2" 2 days ago</p>
  <ExerciseList v-if="exerciseDay" :exercises="exerciseDay.exercises" />
  <button>Done</button>
</template>

<style>
.day-select {
  width: 100%;
  font-size: 1.25rem;
}
</style>
