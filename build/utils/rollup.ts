import externalGlobals from 'rollup-plugin-external-globals';

const external = ['vue', 'naive-ui', 'echarts/core', 'echarts', 'vue-demi', 'vue3-sfc-loader', 'vue-cropper'];

export const globals = {
  vue: 'Vue',
  'naive-ui': 'naive',
  'echarts/core': 'echarts',
  echarts: 'echarts',
  'vue-cropper': 'VueCropper',
  'vue-demi': 'VueDemi',
  'vue3-sfc-loader': "window['vue3-sfc-loader']"
};

export default {
  external,
  input: 'src/main.ts',
  output: {
    globals
  },
  plugins: [externalGlobals(globals)]
};
