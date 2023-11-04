<template>
  <n-card class="app-table" :class="{ 'is-fullscreen': state.fullscreen, [state.class]: true }" :bordered="false">
    <template #header>
      <table-header v-if="state.showHeader" :table-key="state.tableKey">
        <slot name="header" />
        <slot name="search" />
      </table-header>
      <toolbars v-if="state.showLeftTool || state.showRightTool" :table-key="state.tableKey">
        <template #left><slot name="leftToolbar" /></template>
        <template #right><slot name="rightToolbar" /></template>
      </toolbars>
    </template>
    <div class="app-table-body">
      <n-data-table
        ref="tableRef"
        v-bind="state.props"
        :key="state.tableKey"
        :data="state.data"
        :columns="state.columns"
        :pagination="state.pagination"
        :loading="state.loading"
      >
        <template #empty><slot name="empty" /></template>
        <template #loading><slot name="loading" /></template>
      </n-data-table>
      <slot name="context-menu" />
    </div>
    <template #footer>
      <div class="app-table-footer">
        <slot name="footer"></slot>
      </div>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
import { onMounted, ref, unref } from 'vue';
import { NDataTable, NCard } from 'naive-ui';
import type { DataTableInst } from 'naive-ui';
import type { TableInject, TableProps } from '@/naive/types';
import { tableProps, useTable } from '@/naive/factory';
import TableHeader from './components/TableHeader.vue';
import Toolbars from './components/Toolbars.vue';
defineOptions({
  name: 'AppTable',
  inheritAttrs: false
});
const emit = defineEmits(['success']);
const props = withDefaults(defineProps<TableProps>(), tableProps);
const tableRef = ref<DataTableInst | undefined>();
const state: TableInject = useTable(props, emit);
onMounted(() => {
  state.updateTableRef(unref(tableRef));
});
defineExpose(state);
</script>

<style lang="scss" scoped>
.app-table {
  --n-padding-top: 10px !important;
  --n-padding-left: 15px !important;
  --n-padding-bottom: 10px !important;
  --n-padding-right: 15px !important;
  &.is-fullscreen {
    z-index: 1050;
  }
}
</style>
