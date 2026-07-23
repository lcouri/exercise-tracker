<script setup lang="ts">
import { computed, ref } from 'vue';
import { useExerciseStore } from '@/stores/exercise';

type Props = {
  exerciseId: string;
};

const props = defineProps<Props>();

const exerciseStore = useExerciseStore();

// shortcut to referenced exercise
const exercise = computed(() => exerciseStore.exercises?.[props.exerciseId]);

const toggleExpand = ref<boolean>(false);
const currentSetNumber = ref<number>(0);

const toggleCustomWeight = ref<boolean>(false);
const customWeight = ref<number>(exercise.value?.next.weight || 0);
const setCustomWeight = () => {
  if (exercise.value) {
    exercise.value.next.weight = customWeight.value;
  }
  toggleCustomWeight.value = false;
};

const toggleCustomSetsReps = ref(false);
const customSets = ref(exercise.value?.next.sets || 0);
const customReps = ref(exercise.value?.next.reps || 0);
const setCustomSetsReps = () => {
  if (exercise.value) {
    exercise.value.next.sets = customSets.value;
    exercise.value.next.reps = customReps.value;
  }
  toggleCustomSetsReps.value = false;
};

const incrementWeight = () => {
  if (exercise.value) {
    exercise.value.next.weight = exercise.value.next.weight + exercise.value.weightIncrement;
  }
};
</script>

<template>
  <div v-if="!exercise">Error</div>
  <template v-else>
    <button class="exercise-button" @click="toggleExpand = !toggleExpand">
      <div>{{ exercise.next.weight }}kg</div>
      <div>{{ `${exercise.next.sets}x${exercise.next.reps}` }}</div>
      <div>{{ exercise.name }}{{ exercise.notes ? '*' : '' }}</div>
    </button>
    <div v-if="toggleExpand" class="expand">
      <div>
        <button @click="currentSetNumber += 1">+</button>
        {{ `${currentSetNumber} / ${exercise.next.sets}` }}
        <button @click="currentSetNumber -= 1">-</button>
      </div>
      <div>
        <button @click="incrementWeight">
          {{ `+${exercise.weightIncrement}kg` }}
        </button>
        <button v-if="!toggleCustomWeight" @click="toggleCustomWeight = !toggleCustomWeight">
          Set custom
        </button>
        <input v-if="toggleCustomWeight" type="number" v-model="customWeight" />
        <button v-if="toggleCustomWeight" @click="setCustomWeight">✅</button>
      </div>
      <div>
        <button v-if="!toggleCustomSetsReps" @click="toggleCustomSetsReps = !toggleCustomSetsReps">
          Change set/reps
        </button>
        <input v-if="toggleCustomSetsReps" type="number" v-model="customSets" />
        <input v-if="toggleCustomSetsReps" type="number" v-model="customReps" />
        <button v-if="toggleCustomSetsReps" @click="setCustomSetsReps">✅</button>
      </div>
      <div v-for="note in exercise.notes" :key="note" class="notes">
        <p>
          {{ note }}
        </p>
        <div class="edit-button">
          <button>📝</button>
        </div>
      </div>
      <button @click="exerciseStore.save">Save</button>
    </div>
  </template>
</template>

<style>
.exercise-button {
  display: contents;
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
