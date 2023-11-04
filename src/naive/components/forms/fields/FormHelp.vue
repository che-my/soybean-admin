<script setup lang="ts">
import { NIcon } from 'naive-ui';
interface Props {
  help?: string;
}
defineProps<Props>();
</script>

<template>
  <div class="form-help flex-center">
    <n-icon size="18"><svg-icon icon="mdi:help-circle-outline"></svg-icon></n-icon>
    <span class="pl-2 py-1">{{ help }}</span>
  </div>
</template>
<style lang="scss" scoped>
.form-help {
  font-size: 14px;
  color: var(--help-color);
}
</style>
