<template>
  <n-popover :placement="placement" trigger="click">
    <template #trigger>
      <n-input
        v-model:value="modelValue"
        class="icon-input"
        :class="inputClass"
        :size="size"
        :clearable="clearable"
        :disabled="disabled"
        readonly
        :placeholder="placeholder"
        :style="inputStyle"
        v-bind="attrs"
      >
        <template v-if="direction === 'left'" #prefix>
          <svg-icon :key="iconKey" :icon="selectedIcon" class="text-30px p-5px" />
        </template>
        <template v-else #suffix>
          <svg-icon :key="iconKey" :icon="selectedIcon" class="text-30px p-5px" />
        </template>
      </n-input>
    </template>
    <template #header>
      <n-input v-model:value="searchValue" placeholder="搜索图标"></n-input>
    </template>
    <div v-if="iconsList.length > 0" class="grid grid-cols-9 h-auto overflow-auto">
      <span v-for="iconItem in iconsList" :key="iconItem" @click="handleChange(iconItem)">
        <svg-icon
          :icon="iconItem"
          class="border-1px border-#d9d9d9 text-30px m-2px p-5px cursor-pointer"
          :class="{ 'border-primary': modelValue === iconItem }"
        />
      </span>
    </div>
    <n-empty v-else class="w-306px" description="你什么也找不到" />
  </n-popover>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { computed, ref, unref, watch, inject, useAttrs } from 'vue';

defineOptions({ name: 'IconSelect' });

interface Props {
  /** 选中的图标 */
  value: string;
  placeholder?: string;
  /** 图标列表 */
  icons: string[];
  /** 未选中图标 */
  emptyIcon?: string;
  size?: NaiveUI.Size;
  disabled?: boolean;
  clearable?: boolean;
  direction?: string;
  inputClass?: string | string[];
  inputStyle?: string | object;
}

const props = withDefaults(defineProps<Props>(), {
  emptyIcon: 'mdi:apps',
  size: undefined,
  disabled: undefined,
  clearable: undefined,
  placeholder: '点击选择图标',
  direction: 'left',
  inputClass: '',
  inputStyle: ''
});

const nFormItem: any = inject('n-form-item');
const disabled = computed<boolean>(() => {
  if (nFormItem && nFormItem.disabled !== undefined) {
    return unref(nFormItem.disabled) || props.disabled || false;
  }
  return props.disabled || false;
});
const placement = computed<NaiveUI.Placement>(() => {
  return props.direction === 'left' ? 'bottom-start' : 'bottom-end';
});

const attrs = useAttrs();

interface Emits {
  (e: 'update:value', val: string): void;
  (e: 'change', val: string): void;
}

const emit = defineEmits<Emits>();
const modelValue: Ref<string | undefined> = defineModel('value');
const selectedIcon = computed(() => modelValue.value || props.emptyIcon);
const iconKey = ref(0);
watch(
  () => unref(selectedIcon),
  () => {
    iconKey.value++;
  }
);

const searchValue = ref('');

const iconsList = computed(() => props.icons.filter(v => v.includes(searchValue.value)));

function handleChange(iconItem: string) {
  modelValue.value = iconItem;
  emit('change', iconItem);
}
</script>

<style lang="scss" scoped>
.icon-input {
  min-width: 200px;
  :deep(.n-input-wrapper) {
    padding-right: 0;
    padding-left: 0;
  }
  :deep(.n-input__suffix) {
    border: 1px solid #d9d9d9;
  }
}
</style>
