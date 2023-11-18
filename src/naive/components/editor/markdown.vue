<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, unref, computed, useAttrs } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { useThemeStore } from '@/store';

defineOptions({
  name: 'Markdown',
  inheritAttrs: false
});

interface Props {
  defaultValue?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: '',
  placeholder: ''
});

const attrs = useAttrs();
const modelValue = defineModel<string>('value');
const defaultValue = computed<string>(() => modelValue.value || props.defaultValue || '');
const vditorCore = ref<Vditor>();
const markdownRef: any = ref<HTMLElement | string>('');
const theme = useThemeStore();
function renderVditor() {
  if (!markdownRef.value) return;
  vditorCore.value = new Vditor(markdownRef.value, {
    placeholder: props.placeholder || '请输入内容',
    height: 400,
    theme: theme.darkMode ? 'dark' : 'classic',
    icon: 'material',
    cache: { enable: false },
    value: unref(defaultValue),
    toolbarConfig: {
      pin: true
    },
    fullscreen: {
      index: 999
    },
    input: value => {
      modelValue.value = value;
    },
    ...attrs
  });
  // vditorCore.value?.setValue(unref(defaultHtml));
  // vditorCore.value?.html2md(unref(defaultHtml));
}

const stopHandle = watch(
  () => theme.darkMode,
  newValue => {
    const themeMode = newValue ? 'dark' : 'classic';
    vditorCore.value?.setTheme(themeMode);
  }
);

onMounted(() => {
  renderVditor();
});

onUnmounted(() => {
  stopHandle();
});
</script>
<template>
  <div ref="markdownRef" class="markdown"></div>
</template>
<style lang="scss" scoped>
.markdown {
  :deep(.vditor-ir pre.vditor-reset) {
    @include scrollbar(8px, #979797);
  }
}
</style>
