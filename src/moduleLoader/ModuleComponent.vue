<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

type Props = {
  module: string;
  component: string;
  exerciseId: string;
};

const props = defineProps<Props>();

const ModuleRender = defineAsyncComponent(() =>
  import(`@/modules/${props.module}/${props.component}.vue`)
);
</script>

<template>
  <ModuleRender :exerciseId="props.exerciseId" />
</template>

<style>
</style>
