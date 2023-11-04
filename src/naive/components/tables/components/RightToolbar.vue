<template>
  <n-button-group :size="state.props.size">
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button @click="state.refresh">
          <template #icon>
            <n-icon><svg-icon local-icon="refresh"></svg-icon></n-icon>
          </template>
        </n-button>
      </template>
      <span>刷新</span>
    </n-tooltip>
    <column-setting :table-key="state.tableKey" />
    <n-tooltip v-if="state.showFullscreen" trigger="hover">
      <template #trigger>
        <n-button v-fullscreen.teleport="options">
          <template #icon>
            <svg-icon v-if="state.fullscreen" local-icon="fullscreen-exit"></svg-icon>
            <svg-icon v-else local-icon="fullscreen"></svg-icon>
          </template>
        </n-button>
      </template>
      <span>{{ state.fullscreen ? '退出全屏' : '全屏' }}</span>
    </n-tooltip>
    <n-tooltip v-if="state.showSearch" trigger="hover">
      <template #trigger>
        <n-button @click="state.toggleHeaderCollapse">
          <template #icon>
            <svg-icon v-if="state.showHeaderCollapse" icon="mdi:close"></svg-icon>
            <svg-icon v-else icon="mdi:search"></svg-icon>
          </template>
        </n-button>
      </template>
      <span>{{ state.showHeaderCollapse ? '关闭搜索' : '打开搜索' }}</span>
    </n-tooltip>
  </n-button-group>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { TableInject } from '@/naive/types';
import { injectTable } from '@/naive/factory';
import ColumnSetting from './ColumnSetting.vue';
interface Props {
  tableKey: string;
}
const props = defineProps<Props>();
const state: TableInject = injectTable(props.tableKey);

const options = reactive({
  target: `.${state.class}`,
  callback(fullscreen: boolean) {
    state.updateFullscreen(fullscreen);
  }
});
</script>

<style scoped></style>
