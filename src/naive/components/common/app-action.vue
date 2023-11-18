<template>
  <n-button v-bind="attrs" @click.stop="onClick">
    <slot></slot>
    <template #icon><slot name="icon"></slot></template>
  </n-button>
</template>

<script lang="ts" setup>
import { computed, unref, useAttrs } from 'vue';
import { $event, uuid } from '@/naive/utils';

defineOptions({
  name: 'AppButton',
  inheritAttrs: false
});

interface Props {
  eventType?: string;
  eventKey: string;
  eventValue?: any;
}

const props = withDefaults(defineProps<Props>(), {
  eventType: 'modal',
  eventKey: '',
  eventValue: true
});

const emit = defineEmits(['click']);
const eventKey = computed(() => props.eventKey || `eventKey_${uuid(8)}`);
const eventValue = computed(() => props.eventValue || true);
const attrs = useAttrs();

const onClick = (e: any) => {
  const eventType = props.eventType;
  if (eventType == 'click') {
    emit('click', e);
  } else if (eventType == 'modal' || eventType == 'drawer') {
    if (unref(eventKey)) {
      $event.emit(unref(eventKey), unref(eventValue));
    }
  }
};
</script>

<style scoped></style>
