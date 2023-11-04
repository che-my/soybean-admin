<template>
  <router-link :to="to">
    <slot></slot>
  </router-link>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';
defineOptions({
  name: 'AppLink'
});
interface Props {
  to: RouteLocationRaw;
}
defineProps<Props>();
</script>

<style scoped></style>
