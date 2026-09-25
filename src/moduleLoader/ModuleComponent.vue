<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { useExerciseStore } from '@/stores/exercise';
import type { ValidModulesT } from '@/schemas/validModules';

type Props = {
  module: ValidModulesT;
  component: string;
  exerciseId: string;
};

const props = defineProps<Props>();

const exerciseStore = useExerciseStore();
const moduleData = exerciseStore.getModuleData(props.exerciseId, props.module);

const ModuleRender = defineAsyncComponent(
  () => import(`@/modules/${props.module}/${props.component}.vue`),
);
</script>

<template>
  <div v-if="!moduleData">Error loading module: {{ props.module }}</div>
  <ModuleRender v-else v-model="moduleData" />
</template>

<style></style>
