import prismjs from 'vite-plugin-prismjs';

export default function createPrismjs() {
  return prismjs({
    languages: [
      'php',
      'html',
      'xml',
      'yaml',
      'svg',
      'js',
      'ts',
      'css',
      'scss',
      'less',
      'json',
      'sql',
      'java',
      'python',
      'go',
      'c',
      'bash',
      'shell'
    ],
    plugins: [
      // 行高亮
      'line-highlight',
      // 显示行号
      'line-numbers',
      // JSON 高亮
      'jsonp-highlight',
      // 突出关键词
      'highlight-keywords',
      // 删除初始换行符
      'remove-initial-line-feed',
      // 显示语言
      'show-language',
      // 自定义类
      'custom-class',
      // 工具栏
      'toolbar',
      // 复制粘贴
      'copy-to-clipboard',
      // 下载按钮
      'download-button',
      // 树视图
      'treeview'
    ],
    theme: 'tomorrow', // 主题prism-tomorrow
    // css配置：默认是false，设置为true，主题才会生效
    css: true
  });
}
