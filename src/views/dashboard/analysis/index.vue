<template>
  <n-space :vertical="true" :size="16">
    <top-chart />
    <data-card />
    <bottom-part />
    <json-editor-vue v-model="json"></json-editor-vue>
  </n-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { JsonEditorVue } from '@/naive/components';
import { BottomPart, DataCard, TopChart } from './components';
const json = ref({
  a: 1,
  b: 23,
  c: [1, 2, 3, 4]
});
</script>

<style scoped></style>
