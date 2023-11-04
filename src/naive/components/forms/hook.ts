import type { Ref } from 'vue';
import { ref } from 'vue';

export function useField(props: any, emit: any) {
  // const modalValue: Ref<any> = defineModel("value")
  const modalValue: Ref<any> = ref<any>(props.value || props.defaultValue || null);
  const onUpdateValue = (value: any) => {
    modalValue.value = value;
    emit('update:value', value);
    emit('change', value);
  };
  return {
    modalValue,
    onUpdateValue
  };
}
