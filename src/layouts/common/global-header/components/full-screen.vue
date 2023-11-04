<template>
  <hover-container class="w-40px h-full" tooltip-content="全屏" :inverted="theme.header.inverted" @click="toggle">
    <svg-icon v-if="isFullscreen" icon="gridicons:fullscreen-exit" class="text-18px"></svg-icon>
    <svg-icon v-else icon="gridicons:fullscreen" class="text-18px"></svg-icon>
  </hover-container>
</template>

<script lang="ts" setup>
import { useFullscreen } from '@vueuse/core';
import { useThemeStore } from '@/store';

defineOptions({ name: 'FullScreen' });

const { isFullscreen, toggle } = useFullscreen();
const theme = useThemeStore();
</script>

<style scoped></style>
