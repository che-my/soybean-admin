<template>
  <n-modal
    v-model:show="modelValue"
    class="app-modal"
    preset="card"
    transform-origin="mouse"
    :auto-focus="false"
    :class="className"
    :style="modalStyle"
    v-bind="attrs"
    @close="close"
    @esc="close"
  >
    <template #header-extra>
      <span v-if="fullscreen" class="base-icons">
        <button class="n-base-close" @click="onFullScreen">
          <n-icon size="18">
            <svg-icon v-if="isFullscreen" local-icon="fullscreen-exit"></svg-icon>
            <svg-icon v-else local-icon="fullscreen"></svg-icon>
          </n-icon>
        </button>
      </span>
    </template>
    <n-scrollbar class="modal-content-scrollbar">
      <div class="modal-content">
        <AsyncVueRender v-if="async" />
        <slot v-else></slot>
      </div>
    </n-scrollbar>
    <template #footer>
      <slot name="footer" />
    </template>
    <template #action>
      <slot name="action" />
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import '@/naive/styles/scss/app-modal.scss';
import { computed, markRaw, onMounted, onUnmounted, ref, unref, useAttrs, watch } from 'vue';
import { NModal, NScrollbar, NIcon } from 'naive-ui';
import { isString } from '@/utils';
import { uuid, elementMove, createVueRender, $event } from '@/naive/utils';
import useAnime from '@/naive/hook/useAnime';
defineOptions({
  name: 'AppModal',
  inheritAttrs: true
});

interface Props {
  top?: string | number;
  width?: string | number;
  height?: string | number;
  modalKey?: string;
  modelValue?: boolean;
  draggable?: boolean;
  fullscreen?: boolean;
  showAction?: boolean;
  async?: boolean;
  api?: string;
}

const props = withDefaults(defineProps<Props>(), {
  top: 0,
  width: 300,
  height: 300,
  modalKey: '',
  modelValue: false,
  draggable: true,
  fullscreen: true,
  showAction: true,
  async: false,
  api: ''
});
const emit = defineEmits(['update:modelValue', 'change']);
const attrs = useAttrs();
const handleString = (field: string | number) => {
  if (isString(field)) {
    const widthIndex = field.indexOf('px');
    if (widthIndex !== -1) {
      return field.slice(0, -2);
    }
  }
  return Number(field);
};
const isEvent = computed(() => props.modalKey);
const modalKey = ref(props.modalKey || `showModal_${uuid(8)}`);
const width = computed(() => handleString(props.width));
const modalTop = computed(() => handleString(props.top) || 0);
const modelValue = defineModel<boolean>();
const async = ref(props.async || false);
const randomClass = `app-model-${uuid(8)}`;

const { isFullscreen, onFullScreen } = useAnime(randomClass, unref(modalTop));

const className = computed(() => {
  return isFullscreen.value ? `${randomClass} is-fullscreen` : randomClass;
});

onMounted(() => {
  if (isEvent.value) {
    $event.on(unref(modalKey), value => {
      modelValue.value = Boolean(value);
    });
  }
});

const onUpdateShow = (value: boolean) => {
  emit('change', value);
  modelValue.value = value;
  if (isEvent.value) {
    $event.emit(unref(modalKey), value);
  }
  if (!value) {
    isFullscreen.value = false;
  }
};

onUnmounted(() => {
  if (isEvent.value) {
    $event.off(unref(modalKey));
  }
});

const modalStyle = computed(() => {
  return {
    '---modal-top': `${unref(modalTop)}px`,
    '---modal-width': `${unref(width)}px`,
    '---modal-cursor': props.draggable ? 'move' : 'unset'
  };
});

const toggle = () => {
  onUpdateShow(!unref(modelValue));
};

const close = () => {
  onUpdateShow(false);
};

const open = () => {
  onUpdateShow(true);
};

watch(
  () => modelValue.value,
  newVal => {
    if (newVal && props.draggable) {
      setTimeout(() => {
        elementMove(`.${randomClass}`, `.${randomClass} .n-card-header`);
      }, 500);
    }
  }
);

const AsyncVueRender = computed<any>(() => {
  return unref(async) ? markRaw(createVueRender(randomClass, props.api)) : undefined;
});

defineExpose({
  open,
  close,
  toggle,
  modelValue
});
</script>
