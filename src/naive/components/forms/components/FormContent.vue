<template>
  <n-form ref="formRef" v-bind="state.props" :model="state.data">
    <slot />
  </n-form>
</template>

<script lang="ts" setup>
import { ref, onMounted, unref } from 'vue';
import type { FormInst } from 'naive-ui';
import { injectForm } from '@/naive/factory';
import type { FormInject } from '@/naive/types';
interface Props {
  formKey: string;
}
const props = defineProps<Props>();
const state: FormInject = injectForm(props.formKey);
const formRef = ref<FormInst>();
onMounted(() => {
  state.updateFormRef(unref(formRef));
});
</script>

<style scoped lang="scss"></style>
