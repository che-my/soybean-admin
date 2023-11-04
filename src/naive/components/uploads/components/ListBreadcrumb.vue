<template>
  <n-space class="file-breadcrumb" align="center" :style="{ background: bgColor }">
    <n-button size="small" :bordered="false" :style="{ borderRight: 'var(--n-border)' }" @click="onBack">
      <template #icon>
        <svg-icon icon="mdi:arrow-left"></svg-icon>
      </template>
    </n-button>
    <n-breadcrumb separator="〉">
      <n-breadcrumb-item @click="onClickDir()">
        <n-icon><svg-icon icon="twemoji:optical-disk"></svg-icon></n-icon>
        {{ name }}
      </n-breadcrumb-item>
      <template v-for="item in list" :key="item.value">
        <n-breadcrumb-item @click="onClickDir(item.value)">{{ item.label }}</n-breadcrumb-item>
      </template>
    </n-breadcrumb>
  </n-space>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed, unref } from 'vue';
import { useThemeVars } from 'naive-ui';
defineProps({
  list: { type: Array as PropType<any[]>, default: () => [] },
  name: { type: String, default: '' }
});
const emit = defineEmits(['change', 'back']);
const themeVars = useThemeVars();
const bgColor = computed(() => unref(themeVars).baseColor);
const onClickDir = (item = '') => {
  emit('change', item);
};

const onBack = () => {
  emit('back');
};
</script>

<style scoped lang="scss">
.file-breadcrumb {
  gap: unset;
  border-left: 1px solid rgba(203, 203, 203, 0.6);
}
</style>
