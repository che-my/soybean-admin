import { h } from 'vue';
import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { REFRESH_TOKEN_CODE } from '@/config';
import { fetchCsrfCookie } from '@/service';
import { useRouterPush } from '@/composables';
import {
  localStg,
  handleAxiosError,
  handleBackendError,
  handleResponseError,
  handleServiceResult,
  transformRequestData
} from '@/utils';
import { handleRefreshToken } from '@/service/request/helpers';
import { ErrorIframe } from '@/naive/components';
import { handleResponse } from '@/naive/api/response';
import ExceptionBase from '@/components/common/exception-base.vue';

const isDebug: boolean = window.appConfig?.debug || false;

type RefreshRequestQueue = (config: AxiosRequestConfig) => void;

/**
 * 封装axios请求类
 * @author Soybean<honghuangdc@gmail.com>
 */
export default class CustomAxiosInstance {
  instance: AxiosInstance;

  backendConfig: Service.BackendResultConfig;

  isRefreshing: boolean;

  retryQueues: RefreshRequestQueue[];

  /**
   *
   * @param axiosConfig - axios配置
   * @param backendConfig - 后端返回的数据配置
   */
  constructor(
    axiosConfig: AxiosRequestConfig,
    backendConfig: Service.BackendResultConfig = {
      codeKey: 'code',
      dataKey: 'data',
      msgKey: 'message',
      successCode: 200
    }
  ) {
    this.backendConfig = backendConfig;
    this.instance = axios.create(axiosConfig);
    this.setInterceptor();
    this.isRefreshing = false;
    this.retryQueues = [];
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    this.instance.interceptors.request.use(
      async config => {
        config.withCredentials = true;
        const handleConfig = { ...config };
        if (handleConfig.headers) {
          // 数据转换
          const contentType = handleConfig.headers['Content-Type'] as UnionKey.ContentType;
          handleConfig.data = await transformRequestData(handleConfig.data, contentType);
          // 设置token
          handleConfig.headers.Authorization = localStg.get('token') || '';
          const content = document.querySelector("[name='csrf-token']")?.getAttribute('content') || '';
          if (content) {
            handleConfig.headers['X-CSRF-TOKEN'] =
              document.querySelector("[name='csrf-token']")?.getAttribute('content') || '';
          }
        }
        return handleConfig;
      },
      (axiosError: AxiosError) => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
    this.instance.interceptors.response.use(
      (async response => {
        const { status, config } = response;
        if (status === 200 || status < 300 || status === 304) {
          const backend: any = response.data;
          const headers = response.headers;
          if (headers['content-type'] === 'text/html; charset=UTF-8') {
            return Promise.resolve(backend);
          }
          const { codeKey, dataKey, successCode } = this.backendConfig;
          handleResponse(backend);
          // 请求成功
          if (backend[codeKey] === successCode) {
            return handleServiceResult(null, backend[dataKey], backend);
          }
          // token失效, 刷新token
          if (REFRESH_TOKEN_CODE.includes(backend[codeKey])) {
            // 原始请求
            const originRequest = new Promise(resolve => {
              this.retryQueues.push((refreshConfig: AxiosRequestConfig) => {
                config.headers.Authorization = refreshConfig.headers?.Authorization;
                resolve(this.instance.request(config));
              });
            });

            if (!this.isRefreshing) {
              this.isRefreshing = true;
              const refreshConfig = await handleRefreshToken(response.config);
              if (refreshConfig) {
                this.retryQueues.map(cb => cb(refreshConfig));
              }
              this.retryQueues = [];
              this.isRefreshing = false;
            }
            return originRequest;
          }
          const error = handleBackendError(backend, this.backendConfig);
          return handleServiceResult(error, null);
        }
        const error = handleResponseError(response);
        return handleServiceResult(error, null);
      }) as (response: AxiosResponse<any, any>) => Promise<AxiosResponse<any, any>>,
      (axiosError: AxiosError) => {
        const response = axiosError.response;
        const request = axiosError.request;
        const { toLogin } = useRouterPush(false);
        if (response?.status === 401) {
          const error = handleAxiosError(axiosError);
          window.$message?.error(error.msg);
          toLogin('index');
          return handleServiceResult(error, null);
        } else if (response?.status === 419) {
          fetchCsrfCookie().then(() => {
            window.location.reload();
          });
          const error = handleAxiosError(axiosError);
          return handleServiceResult(error, null);
        }
        if (isDebug) {
          if (response?.status === 500) {
            window.$dialog?.error({
              title: '500报错信息！',
              content: () => h(ErrorIframe, { content: request.responseText }),
              style: 'width:80%'
            });
            return Promise.reject(response);
          } else if (response?.status === 404) {
            window.$dialog?.error({
              title: '404报错信息！',
              content: () => h(ExceptionBase, { type: '404', back: false }),
              style: 'width:50%; height:500px'
            });
            return Promise.reject(response);
          }
          console.error(response);
          window.$dialog?.error({
            title: '报错信息！',
            content: () => h(ErrorIframe, { content: request.responseText }),
            style: 'width:50%; height:500px'
          });
          return Promise.reject(response);
        }
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
  }
}
