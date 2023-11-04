import type { InjectionKey } from 'vue';
import { inject, provide, reactive } from 'vue';

const storeList = reactive<Record<string, any>>({});

export function useStore<T>(contextName = 'context') {
  // @ts-ignore
  const injectKey: InjectionKey<T> = Symbol(contextName);

  function useProvide(context: T) {
    storeList[contextName] = context;
    provide(injectKey, storeList[contextName]);
    return context;
  }

  function useInject() {
    return inject(injectKey, storeList[contextName]) as T;
  }

  return {
    useProvide,
    useInject
  };
}
