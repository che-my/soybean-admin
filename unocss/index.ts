import initUnocssRuntime from '@unocss/runtime';
import UnocssConfig from './config';

initUnocssRuntime({
  defaults: UnocssConfig,
  autoPrefix: true
});

export { UnocssConfig };
