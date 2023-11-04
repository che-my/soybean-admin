<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, watch } from 'vue';

defineOptions({
  name: 'CheckBoxField',
  inheritAttrs: false
});
type valueType = Array<string | number> | null;
type OptionProp = {
  disabled?: boolean;
  value: string;
  label: string;
};

interface Props {
  options: Array<OptionProp>;
  size?: NaiveUI.Size;
  defaultValue?: valueType;
  disabled?: boolean;
  vertical?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: null,
  size: undefined,
  disabled: undefined,
  vertical: true
});
const isCheck = ref(false);
const modelValue: Ref<any> = defineModel('value', {
  default: (props: Props) => props.defaultValue
});
const emit = defineEmits(['change']);
const onUpdateValue = (value: any) => {
  modelValue.value = value;
  emit('change', value);
};
const indeterminate = ref(false);
watch(
  () => isCheck.value,
  val => {
    let values: Array<string | number> = [];
    if (val) {
      values = props.options.map(item => item.value);
    }
    onUpdateValue(values);
  }
);
watch(
  () => modelValue.value,
  () => {
    if (modelValue.value.length > 0 && modelValue.value.length < props.options.length) {
      indeterminate.value = true;
    } else if (modelValue.value.length === props.options.length) {
      indeterminate.value = false;
      isCheck.value = true;
    } else {
      indeterminate.value = false;
      isCheck.value = false;
    }
  }
);
</script>
<template>
  <n-space :vertical="vertical">
    <n-checkbox v-model:checked="isCheck" :indeterminate="indeterminate" label="全选" />
    <n-checkbox-group v-model:value="modelValue" :size="size" :default-value="defaultValue" :disabled="disabled">
      <n-space item-style="display: flex;">
        <template v-for="option in options">
          <n-checkbox v-bind="option" />
        </template>
      </n-space>
    </n-checkbox-group>
  </n-space>
</template>
