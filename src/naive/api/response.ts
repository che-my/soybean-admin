import { h } from 'vue';
import { VueRender } from '@/naive/components';

interface Response {
  code: number;
  mode?: 'message' | 'notification' | 'dialog';
  type?: 'success' | 'error' | 'info' | 'warning';
  message?: string;
  timeout?: number;
  data: Record<string, any>;
  options: Record<string, any>;
}

export const handleResponse = (result: Response) => {
  // const { mode, message, data } = responseData
  if (result.mode === 'message' || result.mode === 'notification') {
    if (result.message) {
      if (result.type) {
        const toast = () => {
          if (result.mode === 'message') {
            // @ts-ignore
            window.$message[result.type](result.message, {
              duration: 2500,
              ...result.options
            });
          } else {
            // @ts-ignore
            window.$notification[result.type]({
              title: result.message,
              duration: 2500,
              keepAliveOnHover: true,
              ...result.options
            });
          }
        };
        if (result.timeout) {
          setTimeout(() => {
            toast();
          }, result.timeout);
        } else {
          toast();
        }
      }
    }
  } else if (result.mode === 'dialog') {
    const { options, content } = result.options;
    // @ts-ignore
    window.$dialog[result.type]({
      title: result.message,
      maskClosable: false,
      ...options,
      content: () => h(VueRender, { options: content })
    });
  }
};
