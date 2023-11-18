import { defineAsyncComponent } from 'vue';
import HiddenField from './fields/HiddenField.vue';
import RadioField from './fields/RadioField.vue';
import CheckBoxField from './fields/CheckBoxField.vue';
import FormField from './fields/FormField.vue';
export { HiddenField, RadioField, CheckBoxField, FormField };

export const AppForm = defineAsyncComponent(() => import('./app-form.vue'));
