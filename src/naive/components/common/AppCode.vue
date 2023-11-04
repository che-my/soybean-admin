<template>
  <pre
    :class="{ 'line-numbers': showLine }"
    :data-prismjs-copy="copyTitle"
    :data-prismjs-copy-error="copyError"
    :data-prismjs-copy-success="copySuccess"
  ><code :class="'language-'+language">{{code}}</code></pre>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Prism from 'prismjs';
defineOptions({
  name: 'AppCode'
});
defineProps({
  copyTitle: {
    type: String,
    default: '复制'
  },
  copyError: {
    type: String,
    default: '按Ctrl+C复制'
  },
  copySuccess: {
    type: String,
    default: '复制成功'
  },
  language: {
    type: String,
    default: 'php'
  },
  showLine: {
    type: Boolean,
    default: true
  },
  code: {
    type: String,
    default: ''
  }
});
onMounted(() => {
  Prism.highlightAll();
});
</script>

<style scoped>
pre {
  margin: 0;
}
</style>
