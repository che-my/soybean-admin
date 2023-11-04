<script setup lang="ts">
import VueJsoneditor from 'vue3-ts-jsoneditor';
const modelValue = defineModel<object>('value');
</script>
<template>
  <div>
    <vue-jsoneditor v-model:json="modelValue" height="400" mode="tree" />
  </div>
</template>
<style scoped></style>
