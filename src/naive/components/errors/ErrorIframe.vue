<template>
  <div class="layout-error" style="min-height: calc(100vh - 88px)">
    <n-spin :show="loading">
      <iframe ref="iframeRef" class="iframe" style="height: calc(100vh - 88px); width: 99%; border: none"></iframe>
    </n-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, ref } from 'vue';
export default defineComponent({
  name: 'ErrorIframe',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const loading = ref(true);
    const iframeRef = ref<HTMLElement | null>(null);
    const loadIframe = () => {
      setTimeout(() => {
        if (iframeRef.value) {
          // @ts-ignore
          const el = iframeRef.value.contentDocument;
          el.open();
          el.write(props.content);
          el.close();
        }
        loading.value = false;
      }, 200);
    };
    onMounted(() => {
      nextTick(() => loadIframe());
    });
    return {
      loading,
      iframeRef
    };
  }
});
</script>

<style scoped></style>
