<script setup lang="ts">
import { ref, computed } from 'vue'
import ExerciseItem from '@/components/ExerciseItem.vue'
import { useProgrammeStore } from '@/stores/programme'

const programmeStore = useProgrammeStore()

const exerciseDay = ref(programmeStore.programme.dayPlans[0])

const exerciseDaySelect = computed({
  get: () => exerciseDay.value?.name,
  set: (newName) =>
    (exerciseDay.value = programmeStore.programme.dayPlans.find((e) => e.name === newName)),
})
const exerciseDaysAvailable = computed(() => programmeStore.programme.dayPlans)
</script>

<template>
  <h1 hidden>Exercise Tracker</h1>
  <select v-model="exerciseDaySelect" class="day-select">
    <option
      v-for="day in exerciseDaysAvailable"
      :key="day.name"
      :value="day.name"
      :selected="day.name === exerciseDaySelect"
    >
      {{ day.name }} (started 05/14)
    </option>
  </select>
  <p>Did "Day 2" 2 days ago</p>
  <div v-if="exerciseDay" class="exercises">
    <template v-for="exId in exerciseDay.exercises" :key="exId">
      <ExerciseItem :exercise-id="exId" />
    </template>
  </div>
  <button>Done</button>
</template>

<style>
.day-select {
  width: 100%;
  font-size: 1.25rem;
}
.exercises {
  list-style: none;
  padding: 0.5rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
  grid-gap: 0.5rem 0;
}
</style>
