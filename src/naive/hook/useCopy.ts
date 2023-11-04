import { useClipboard } from '@vueuse/core';

export default function useCopy() {
  const { copy, isSupported } = useClipboard();
  function handleCopy(source: any) {
    if (!isSupported) {
      window.$message?.error('您的浏览器不支持Clipboard API');
      return;
    }
    if (!source) {
      window.$message?.error('请输入要复制的内容');
      return;
    }
    copy(source).then(() => {
      window.$message?.success(`复制成功：${source}`);
    });
  }
  return {
    handleCopy
  };
}
