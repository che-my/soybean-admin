<template>
  <hover-container class="w-40px h-full" :inverted="theme.header.inverted" @click="app.toggleSiderCollapse">
    <svg-icon v-if="app.siderCollapse" icon="line-md:menu-unfold-left" class="text-16px"></svg-icon>
    <svg-icon v-else icon="line-md:menu-fold-left" class="text-16px"></svg-icon>
  </hover-container>
</template>

<script lang="ts" setup>
import { useAppStore, useThemeStore } from '@/store';

defineOptions({ name: 'MenuCollapse' });

const app = useAppStore();
const theme = useThemeStore();
</script>

<style scoped></style>
