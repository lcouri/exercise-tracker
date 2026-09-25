<script setup lang="ts">
import { computed, ref } from 'vue';
import setsProgressionData from './setsProgression.json';
import type { ModuleDataT } from '@/schemas/exercise';

const moduleData = defineModel<ModuleDataT<'setsProgression'>>({ required: true });

const currentProgression = computed(
  () => setsProgressionData[moduleData.value.progression][moduleData.value.index],
);

const currentSetNumber = ref<number>(0);

const nextProgression = () => {
  if (moduleData.value.index < 2) {
    moduleData.value.index += 1;
  }
};
</script>

<template>
  <div>
    <button @click="currentSetNumber -= 1">-</button>
    {{ `${currentSetNumber} / ${currentProgression?.sets}` }}
    <button @click="currentSetNumber += 1">+</button>
  </div>
  <div>
    <button @click="nextProgression">Next set progression</button>
  </div>
</template>

<style></style>
