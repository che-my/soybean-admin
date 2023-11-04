<template>
  <hover-container
    tooltip-content="github"
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="handleClickLink"
  >
    <svg-icon icon="mdi:github" class="text-20px"></svg-icon>
  </hover-container>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store';

defineOptions({ name: 'GithubSite' });

const props = defineProps({
  link: { type: String, default: '' }
});
// 'https://github.com/honghuangdc/soybean-admin'
const theme = useThemeStore();
function handleClickLink() {
  window.open(props.link, '_blank');
}
</script>

<style scoped></style>
