<template>
  <n-drawer
    v-bind="{ ...$props, ...$attrs }"
    v-model:show="showDrawer"
    class="app-drawer"
    @update:show="onUpdateShow"
    @close="close"
    @esc="close"
  >
    <n-drawer-content closable :title="title" :native-scrollbar="false" v-bind="contentAttrs">
      <AsyncVueRender v-if="async" />
      <slot v-else></slot>
      <template #footer><slot name="footer"></slot></template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { computed, markRaw, onMounted, onUnmounted, ref, unref, watch } from 'vue';
import { NDrawer } from 'naive-ui';
import { $event, createVueRender, uuid } from '@/naive/utils';
defineOptions({
  name: 'AppDrawer',
  extends: NDrawer,
  inheritAttrs: true
});

interface Props {
  drawerKey?: string;
  modelValue?: boolean;
  contentAttrs?: object;
  title?: string;
  async?: boolean;
  api?: string;
}
const props = withDefaults(defineProps<Props>(), {
  drawerKey: '',
  modelValue: false,
  contentAttrs: undefined,
  title: '',
  async: false,
  api: ''
});
const emit = defineEmits(['update:modelValue', 'change']);
const drawerKey = ref(props.drawerKey || `showModal_${uuid(8)}`);
const modelValue = computed(() => props.modelValue || false);
const showDrawer = ref<boolean>(props.modelValue || false);
const async = ref<boolean>(props.async || false);
const contentAttrs = computed(() => props.contentAttrs);
const randomClass = `app-drawer-${uuid(8)}`;

watch(
  () => unref(modelValue),
  () => {
    showDrawer.value = unref(modelValue);
  }
);

onMounted(() => {
  $event.on(unref(drawerKey), value => {
    showDrawer.value = Boolean(value);
  });
});

onUnmounted(() => {
  $event.off(unref(drawerKey));
});

const toggle = () => {
  onUpdateShow(!unref(showDrawer));
};

const close = () => {
  onUpdateShow(false);
};

const open = () => {
  onUpdateShow(true);
};

const onUpdateShow = (value: boolean) => {
  emit('update:modelValue', value);
  emit('change', value);
  $event.emit(unref(drawerKey), value);
};

watch(
  () => unref(modelValue),
  newVal => {
    onUpdateShow(newVal);
  }
);

const AsyncVueRender = computed<any>(() => {
  return unref(async) ? markRaw(createVueRender(randomClass, props.api)) : undefined;
});

defineExpose({
  open,
  close,
  toggle,
  showDrawer
});
</script>

<style scoped></style>
