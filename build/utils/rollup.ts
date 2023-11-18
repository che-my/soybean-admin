import externalGlobals from 'rollup-plugin-external-globals';

const external = ['vue', 'naive-ui', 'vue-demi'];

export const globals = {
  vue: 'Vue',
  'naive-ui': 'naive',
  'vue-demi': 'VueDemi'
};

export default {
  external,
  input: 'src/main.ts',
  output: {
    globals
  },
  plugins: [externalGlobals(globals)]
};
