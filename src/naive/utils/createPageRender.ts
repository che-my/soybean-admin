import { defineComponent, h, onMounted, reactive, ref, unref } from 'vue';
import { useRoute } from 'vue-router';
import { request } from '@/naive/api';
import { VueRender } from '@/naive/components';
import type { EntryOptions } from '@/naive/types';
import ExceptionBase from '@/components/common/exception-base.vue';
import PageLoading from './PageLoading';

export function createVueRender(name: string, api = '') {
  return defineComponent({
    name,
    setup() {
      const options = reactive<EntryOptions>({} as unknown as EntryOptions);
      const route = useRoute();
      const status = ref(200);
      const optionsKey = ref(0);
      const headers: any = {
        'X-Ajax-Method': api ? 'ajax' : 'page'
      };
      const initRequest = async () => {
        const apiUrl = api ? api : route.fullPath.replace(route.hash, '');
        request
          .get(apiUrl, {
            headers
          })
          .then(async (res: any) => {
            Object.assign(options, res.data.content);
            optionsKey.value++;
          })
          .catch((err: any) => {
            status.value = err.status;
            console.error(status.value, err);
          });
      };

      onMounted(async () => {
        await initRequest();
      });

      const renderContent = () => {
        return unref(optionsKey) ? h(VueRender, { options: unref(options), key: unref(optionsKey) }) : h(PageLoading);
      };

      return () => {
        switch (unref(status)) {
          case 200:
            return renderContent();
          case 403:
            return h(ExceptionBase, { type: '403' });
          case 404:
            return h(ExceptionBase, { type: '404' });
          default:
            return h(ExceptionBase, { type: '500' });
        }
      };
    }
  });
}
