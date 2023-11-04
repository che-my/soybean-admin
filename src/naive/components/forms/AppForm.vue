<template>
  <div v-if="formType === 'page'" :key="state.formKey" class="app-form">
    <FormContent :form-key="state.formKey">
      <slot />
      <FormFooter v-if="state.showFooter" :form-key="state.formKey" />
      <slot v-else name="footer"></slot>
    </FormContent>
  </div>
  <AppModal v-if="formType === 'modal'" class="app-form p-0" v-bind="modalProps" :model-key="modalKey">
    <FormContent :form-key="state.formKey"><slot :model="state.data" /></FormContent>
    <template #action>
      <slot name="footer"></slot>
      <FormFooter :form-key="state.formKey" />
    </template>
  </AppModal>
  <AppDrawer v-if="formType === 'drawer'" class="app-form p-0" v-bind="drawerProps" :model-key="drawerKey">
    <FormContent :form-key="state.formKey"><slot :model="state.data" /></FormContent>
    <template #footer>
      <slot name="footer"></slot>
      <FormFooter :form-key="state.formKey" />
    </template>
  </AppDrawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useForm, formProps, FormEmitTypes } from '@/naive/factory';
import type { BaseFormProps } from '@/naive/types';
import AppModal from '../common/AppModal.vue';
import AppDrawer from '../common/AppDrawer.vue';
import FormContent from './components/FormContent.vue';
import FormFooter from './components/FormFooter.vue';
defineOptions({ name: 'AppForm', inheritAttrs: false });
const props = withDefaults(defineProps<BaseFormProps>(), formProps);
const emit = defineEmits(FormEmitTypes);
const formType = computed(() => props.type);
const state = useForm(props, emit);
defineExpose(state);
</script>

<style scoped lang="scss">
.app-form {
  position: relative;
  .n-form__action {
    position: absolute;
    bottom: 0;
  }
}
</style>
