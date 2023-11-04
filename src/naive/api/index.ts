import type { AxiosRequestConfig } from 'axios';
import { getServiceEnvConfig } from '~/.env-config';
import { createRequest, createHookRequest } from './request';
const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';
const { url, proxyPattern } = getServiceEnvConfig(import.meta.env);
const axiosConfig: AxiosRequestConfig = window.appConfig?.axiosConfig || {};

export const request = createRequest({ baseURL: isHttpProxy ? proxyPattern : url, ...axiosConfig });
export const hookRequest = createHookRequest({ baseURL: isHttpProxy ? proxyPattern : url });
