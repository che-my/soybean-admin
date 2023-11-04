<template>
  <n-space justify="space-evenly">
    <n-button @click="state.onReset">重置</n-button>
    <n-button type="primary" @click="state.onSubmit">提交</n-button>
  </n-space>
</template>

<script lang="ts" setup>
import type { FormInject } from '@/naive/types';
import { injectForm } from '@/naive/factory';
interface Props {
  formKey?: string;
}
const props = withDefaults(defineProps<Props>(), {
  formKey: ''
});
const state: FormInject = injectForm(props.formKey);
</script>

<style scoped></style>
