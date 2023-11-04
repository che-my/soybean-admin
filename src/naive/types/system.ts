import type { Component } from 'vue';
import type { VueRendererProps } from '@knxcloud/lowcode-vue-renderer';
import type { AxiosRequestConfig } from 'axios';

export declare type Records = Record<string, any>;

export type EntryOptions<T = Records> = Omit<VueRendererProps, 'schema'> & {
  scope?: any;
  components?: Record<string, Component>;
  passProps?: any;
  schema: any;
  packages?: Array<T>;
  locale?: any;
  messages?: any;
  maps?: Array<T>;
  [index: string]: any;
};

export declare interface AppConfig {
  baseUrl: string;
  isHash: boolean;
  debug: boolean;
  route?: any;
  axiosConfig?: AxiosRequestConfig;
  themeConfig?: Theme.Setting;

  [index: string]: any;
}
