<script setup lang="ts">
import { useAttrs, useSlots, computed, unref } from 'vue';
import { NFormItem, NSpace, useThemeVars } from 'naive-ui';
import FormHelp from './FormHelp.vue';

type alignType = 'stretch' | 'baseline' | 'start' | 'end' | 'center' | 'flex-end' | 'flex-start';

interface Props {
  help?: string;
  helpColor?: string;
  vertical?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  help: undefined,
  helpColor: undefined,
  vertical: false
});
const attrs = useAttrs();
const slots = useSlots();
const vertical = computed(() => props.vertical || false);
const align = computed<alignType>(() => (unref(vertical) ? 'flex-start' : 'center'));
const themeVars = useThemeVars();
const helpColor = computed<string>(() => props.helpColor || themeVars.value.textColor3);
</script>

<template>
  <n-form-item v-bind="attrs">
    <template v-if="slots.feedback" #feedback>
      <slot name="feedback"></slot>
    </template>
    <template v-if="slots.label" #label>
      <slot name="label"></slot>
    </template>
    <n-space
      class="form-field"
      :align="align"
      :vertical="vertical"
      :style="{ '--help-color': helpColor }"
      :item-style="{ width: 'inherit' }"
    >
      <slot></slot>
      <slot name="help">
        <form-help v-if="help" :help="help"></form-help>
      </slot>
    </n-space>
  </n-form-item>
</template>
<style></style>
<style lang="scss" scoped>
.form-field {
  box-sizing: border-box;
  width: inherit;
}
</style>
