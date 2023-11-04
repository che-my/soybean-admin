import type { UploadCustomRequestOptions } from 'naive-ui';
import type { AxiosRequestConfig } from 'axios';
import { request } from '@/naive/api';

export async function uploadRequest(options: UploadCustomRequestOptions, name = 'file') {
  const { data, file, withCredentials, headers } = options;
  if (options.action) {
    if (file.file) {
      const formData = new FormData();
      formData.append(name, file.file);
      if (data) {
        Object.keys(data)?.forEach((key: string) => {
          formData.append(key, data[key as keyof UploadCustomRequestOptions['data']]);
        });
      }
      const config: AxiosRequestConfig = {
        headers: { ...headers },
        withCredentials
      };
      request
        .post(options.action, formData, config)
        .then((ret: any) => {
          if (ret.type === 'success' && ret.data) {
            options.file.url = ret.data.url;
            options.file.fullPath = ret.data.path;
            options.file.thumbnailUrl = ret.data?.thumbnailUrl || '';
            options.file.percentage = ret.data?.percentage || 100;
            options.onFinish && options.onFinish();
          }
        })
        .catch(() => {
          options.onError && options.onError();
        });
    } else {
      window.$message?.error('请先上传文件');
    }
  } else {
    window.$message?.error('请先设置好上传地址:action');
  }
}
