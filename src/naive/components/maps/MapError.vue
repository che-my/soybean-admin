<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div v-if="message" class="wh-full absolute-lt">
    <n-alert title="温馨提示" type="error">{{ message }}</n-alert>
  </div>
</template>
