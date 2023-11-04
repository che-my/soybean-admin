<script setup lang="ts">
import { computed, onMounted, ref, unref } from 'vue';

interface Props {
  show: boolean;
  keyword: string;
  options: Array<Record<string, any>>;
}
const modelValue = defineModel<string>('keyword');
const modelShow = defineModel<boolean>('show');
const props = defineProps<Props>();
const length = computed(() => props.options.length);
const emit = defineEmits(['search', 'tapClick', 'down']);
const onInput = () => {
  emit('search');
};
const onClickOption = (option: any) => {
  emit('tapClick', option);
};

const lock = ref(false);

const onScroll = (e: Event) => {
  const target: any = e.target;
  const scrollTop = target?.scrollTop;
  const offsetHeight = target?.offsetHeight;
  const scrollHeight = target?.scrollHeight;
  lock.value = unref(length) === 0;
  if (offsetHeight + scrollTop === scrollHeight && !lock.value) {
    emit('down');
  }
};

onMounted(() => {});
</script>

<template>
  <div class="map-header">
    <div class="w-400px">
      <n-input
        v-model:value="modelValue"
        placeholder="输入地址搜索"
        @input="onInput"
        @keydown.enter="onInput"
      ></n-input>
    </div>
    <div class="list-options shadow">
      <n-scrollbar style="max-height: 500px" @scroll="onScroll">
        <n-collapse-transition :show="modelShow">
          <n-list hoverable clickable>
            <template v-for="option in options">
              <n-list-item @click.stop="onClickOption(option)">
                <n-thing :title="option.title">
                  <template #description>
                    <n-tag :bordered="false" type="info" size="small">
                      {{ option.address }}
                    </n-tag>
                  </template>
                </n-thing>
              </n-list-item>
            </template>
          </n-list>
        </n-collapse-transition>
      </n-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.map-header {
  position: relative;
  .list-options {
    position: absolute;
    top: 34px;
    left: 0;
    z-index: 9999;
    height: 500px;
    overflow: hidden;
    //@include scrollbar(8px, #979797);
  }
}
</style>
