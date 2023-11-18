import * as Vue from 'vue';
import { defineAsyncComponent, markRaw } from 'vue';
import type { AsyncComponentLoader } from '@vue/runtime-core/dist/runtime-core';
// @ts-ignore
import { loadModule } from 'vue3-sfc-loader';
import { request } from '@/naive/api';
import PageLoading from './PageLoading';

const addStyle = (textContent: string): void => {
  const style = Object.assign(document.createElement('style'), { textContent });
  const ref = document.head.getElementsByTagName('style')[0] || null;
  // @ts-ignore
  document.head.insertBefore(style, ref);
};

const loadMarkRawComponent = (file: string, options: any = {}) => {
  const moduleOptions: any = {
    moduleCache: {
      vue: Vue
    },
    addStyle,
    ...options
  };
  const Loader: AsyncComponentLoader = () => loadModule(file, moduleOptions);
  return markRaw(
    defineAsyncComponent({
      loader: Loader,
      loadingComponent: PageLoading,
      delay: 200,
      timeout: 10000
    })
  );
};

/**
 *
 * @param file
 */
export const loadApiComponent = (file: string) => {
  return loadMarkRawComponent(file, {
    async getFile(apiUrl: string) {
      const content = await request.get(apiUrl);
      return {
        getContentData: () => Promise.resolve(content)
      };
    }
  });
};

/**
 * { path:string, tpl:string }
 * @param item
 */
export const loadSfcComponent = (item: { path: string; tpl: string }) => {
  return loadMarkRawComponent(item.path, {
    async getFile() {
      return {
        getContentData: () => Promise.resolve(item.tpl)
      };
    }
  });
};
