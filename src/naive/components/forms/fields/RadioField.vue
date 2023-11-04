<script setup lang="ts">
import type { Ref } from 'vue';
import { computed } from 'vue';
import type { OptionProp } from '../utils';
import { RenderRadio } from '../utils';

defineOptions({
  name: 'RadioField',
  inheritAttrs: false
});
type valueType = string | number | null;

interface Props {
  options: Array<OptionProp>;
  name: string;
  size?: NaiveUI.Size;
  defaultValue?: valueType;
  disabled?: boolean;
  button?: boolean;
}

// @ts-ignore
const props = withDefaults(defineProps<Props>(), {
  name: '',
  defaultValue: null,
  size: undefined,
  button: false,
  disabled: undefined
});
const button = computed(() => props.button || false);
const modelValue: Ref<any> = defineModel('value', {
  default: (props: Props) => props.defaultValue
});
const emit = defineEmits(['change']);
const onUpdateValue = (value: any) => {
  modelValue.value = value;
  emit('change', value);
};
</script>

<template>
  <n-radio-group
    v-model:value="modelValue"
    :name="name"
    :disabled="disabled"
    :size="size"
    @update:value="onUpdateValue"
  >
    <RenderRadio :options="options" :button="button"></RenderRadio>
  </n-radio-group>
</template>
