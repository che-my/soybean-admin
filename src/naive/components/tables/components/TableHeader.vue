<template>
  <div class="app-table-header">
    <n-collapse-transition :show="state.showHeaderCollapse">
      <div>
        <slot></slot>
      </div>
      <!--			<app-form v-if="state.showSearch" v-bind="state.searchForm" :model="state.searchModel">-->
      <!--				<slot name="search"></slot>-->
      <!--				<n-form-item>-->
      <!--					<n-space>-->
      <!--						<n-button :loading="state.props.loading" type="primary" @click="state.onSearch">查询</n-button>-->
      <!--						<n-button @click="state.onReset">重置</n-button>-->
      <!--					</n-space>-->
      <!--				</n-form-item>-->
      <!--			</app-form>-->
    </n-collapse-transition>
  </div>
</template>

<script lang="ts" setup>
import type { TableInject } from '@/naive/types';
import { injectTable } from '@/naive/factory';
interface Props {
  tableKey: string;
}
const props = defineProps<Props>();
const state: TableInject = injectTable(props.tableKey);
</script>

<style scoped></style>
