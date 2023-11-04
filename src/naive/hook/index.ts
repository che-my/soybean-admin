import dayjs from 'dayjs';
import * as store from '@/store';
import { useRouterPush, useEcharts, useIconRender, usePermission } from '@/composables';
import * as $hooks from '@/hooks';
import * as $utils from '@/utils';
import { $event, createVueRender, uuid } from '@/naive/utils';
import { request, hookRequest } from '@/naive/api';
import useAnime from './useAnime';
import useCopy from './useCopy';

export * from './useStore';
export * from './useDropdown';

export declare interface Scope {
  $event: typeof $event;
  $utils: typeof $utils;
  $hooks: typeof $hooks;
  store: typeof store;
  request: typeof request;
  hookRequest: typeof hookRequest;
  dayjs: typeof import('dayjs');
  $tools: object;
}

export const useScope = (): Scope => {
  const { iconRender } = useIconRender();
  const { hasPermission } = usePermission();

  const $tools = {
    uuid,
    useEcharts,
    useAnime,
    useCopy,
    iconRender,
    hasPermission,
    createVueRender,
    ...useRouterPush(false)
  };

  return {
    $event,
    $utils,
    $hooks,
    store,
    request,
    hookRequest,
    dayjs,
    $tools
  };
};

if (typeof window !== 'undefined') {
  window.useScope = useScope;
}
