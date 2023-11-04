<template>
  <div class="app-table-toolbars">
    <div class="flex-between">
      <div v-if="state.showLeftTool" class="left-toolbars" style="width: 100%">
        <n-space justify="space-between">
          <slot name="left" />
          <slot name="right" />
        </n-space>
      </div>
      <n-space v-if="state.showRightTool" class="right-toolbars pl-3">
        <right-toolbar :table-key="state.tableKey" />
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { injectTable } from '@/naive/factory';
import type { TableInject } from '@/naive/types';
import RightToolbar from './RightToolbar.vue';
interface Props {
  tableKey: string;
}
const props = defineProps<Props>();
const state: TableInject = injectTable(props.tableKey);
</script>
