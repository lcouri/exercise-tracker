<script setup lang="ts">
import { computed } from 'vue';
import setsProgressionData from './setsProgression.json';
import type { ModuleDataT } from '@/schemas/exercise';

const moduleData = defineModel<ModuleDataT<'setsProgression'>>({ required: true });

const currentProgression = computed(
  () => setsProgressionData[moduleData.value.progression][moduleData.value.index],
);
</script>

<template>
  <div>
    {{ `${currentProgression?.sets}x${currentProgression?.reps}` }}
  </div>
</template>

<style></style>
