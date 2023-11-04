interface Window {
  Vue: typeof import('vue');
  TMap: any;
  appConfig: import('@/naive/types').AppConfig;
  $loadingBar?: import('naive-ui').LoadingBarProviderInst;
  $dialog?: import('naive-ui').DialogProviderInst;
  $message?: import('naive-ui').MessageProviderInst;
  $notification?: import('naive-ui').NotificationProviderInst;
  'vue3-sfc-loader': typeof import('vue3-sfc-loader/dist/types/vue3/index');
  appRender(dom: string, callback?: ADMIN.AppCallback): Promise<void>;
  useScope(): import('@/naive/hook').Scope;
}

interface ViewTransition {
  ready: Promise<void>;
}

interface Document {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition;
}

/** 通用类型 */
declare namespace Common {
  /**
   * 策略模式
   * [状态, 为true时执行的回调函数]
   */
  type StrategyAction = [boolean, () => void];

  /** 选项数据 */
  type OptionWithKey<K> = { value: K; label: string };
}

declare namespace ADMIN {
  type AppCallback = (app: import('vue').App) => void;
}

/** 构建时间 */
declare const PROJECT_BUILD_TIME: string;
