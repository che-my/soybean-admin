<template>
  <svg-icon v-if="fill" local-icon="logo-fill"></svg-icon>
  <svg-icon v-else local-icon="logo"></svg-icon>
</template>

<script lang="ts" setup>
defineOptions({ name: 'SystemLogo' });

interface Props {
  /** logo是否填充 */
  fill?: boolean;
}

withDefaults(defineProps<Props>(), {
  fill: false
});
</script>

<style scoped></style>
