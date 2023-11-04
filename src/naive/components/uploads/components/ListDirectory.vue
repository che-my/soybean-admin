<template>
  <template v-for="item in list" :key="item.value">
    <div class="flex shadow-lg rounded-md list-item cursor-pointer" @dblclick="onClickDir(item.value)">
      <n-card content-style="padding:2px 4px;" footer-style="padding:15px 4px">
        <n-icon size="100"><svg-icon icon="fluent-emoji:file-folder"></svg-icon></n-icon>
        <template #footer>
          <n-ellipsis class="text-items" :line-clamp="2">
            {{ item.label }}
          </n-ellipsis>
        </template>
      </n-card>
    </div>
  </template>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
defineProps({
  list: { type: Array as PropType<any[]>, default: () => [] }
});
const emit = defineEmits(['change']);
const onClickDir = (item = '') => {
  emit('change', item);
};
</script>

<style lang="scss" scoped>
:deep(.text-items) {
  max-width: 100px;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
