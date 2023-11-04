<template>
  <n-popover placement="bottom" trigger="hover">
    <template #trigger>
      <n-button>
        <template #icon>
          <svg-icon icon="ic:sharp-text-fields"></svg-icon>
        </template>
      </n-button>
    </template>
    <template #header>
      <n-space justify="space-between">
        <n-checkbox :checked="checkAll" :indeterminate="indeterminate" @update:checked="onAllUpdateCheck">
          全选/全不选
        </n-checkbox>
      </n-space>
    </template>
    <div class="w-180px">
      <vue-draggable v-model="list" item-key="key">
        <template #item="{ element }">
          <div v-if="element.key" class="flex-y-center h-36px px-12px hover:bg-primary_active">
            <svg-icon icon="mdi:drag" class="mr-8px text-20px cursor-move"></svg-icon>
            <n-checkbox v-model:checked="element.show">
              {{ element.title }}
            </n-checkbox>
          </div>
        </template>
      </vue-draggable>
    </div>
  </n-popover>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, unref, watch } from 'vue';
import type { TableInject, TableColumn } from '@/naive/types';
import { injectTable } from '@/naive/factory';
import { VueDraggable } from '../../common';
interface Props {
  tableKey: string;
}
const props = defineProps<Props>();
const state: TableInject = injectTable(props.tableKey);

const list = ref<TableColumn[]>(initList());

function initList(): TableColumn[] {
  return state.columns.map((item: TableColumn) => {
    item.show = item.show !== undefined ? item.show : true;
    return item;
  });
}

const checkAll = computed(() => unref(list).filter(item => item.show).length === unref(list).length);

const indeterminate = computed(() => {
  const selects = list.value.filter((item: any) => item.show && item.key);
  const isIndeterminate = selects.length > 0 && selects.length !== unref(list).filter((item: any) => item.key).length;
  if (list.value && list.value.length > 0) {
    // unref(list)[0].show = !(!isIndeterminate && !selects.length);
  }
  return isIndeterminate;
});

const updateColumns = (newValue: any[]) => {
  const newColumns = newValue
    .filter(item => item.show)
    .map(item => {
      const column = { ...item };
      delete column.show;
      return column;
    }) as TableColumn[];
  state.updateColumns(newColumns);
};

onMounted(() => {
  updateColumns(unref(list));
});

watch(
  list,
  newValue => {
    updateColumns(newValue);
  },
  { deep: true }
);

const onAllUpdateCheck = (checked: boolean) => {
  list.value.map(item => (item.show = checked));
};
</script>

<style scoped></style>
