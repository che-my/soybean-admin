import type { RouteComponent } from 'vue-router';

export const views: Record<
  PageRoute.LastDegreeRouteKey,
  RouteComponent | (() => Promise<{ default: RouteComponent }>)
> = {
  403: () => import('./_builtin/403/index.vue'),
  404: () => import('./_builtin/404/index.vue'),
  500: () => import('./_builtin/500/index.vue'),
  'constant-page': () => import('./_builtin/constant-page/index.vue'),
  login: () => import('./_builtin/login/index.vue'),
  'not-found': () => import('./_builtin/not-found/index.vue'),
  about: () => import('./about/index.vue'),
  'auth-demo_permission': () => import('./auth-demo/permission/index.vue'),
  'auth-demo_super': () => import('./auth-demo/super/index.vue'),
  charts: () => import('./charts/index.vue'),
  component_button: () => import('./component/button/index.vue'),
  component_card: () => import('./component/card/index.vue'),
  component_table: () => import('./component/table/index.vue'),
  dashboard_analysis: () => import('./dashboard/analysis/index.vue'),
  dashboard_workbench: () => import('./dashboard/workbench/index.vue'),
  document_naive: () => import('./document/naive/index.vue'),
  'document_project-link': () => import('./document/project-link/index.vue'),
  document_project: () => import('./document/project/index.vue'),
  document_vite: () => import('./document/vite/index.vue'),
  document_vue: () => import('./document/vue/index.vue'),
  'function_tab-detail': () => import('./function/tab-detail/index.vue'),
  'function_tab-multi-detail': () => import('./function/tab-multi-detail/index.vue'),
  function_tab: () => import('./function/tab/index.vue'),
  function_websocket: () => import('./function/websocket/index.vue'),
  management_auth: () => import('./management/auth/index.vue'),
  management_role: () => import('./management/role/index.vue'),
  management_route: () => import('./management/route/index.vue'),
  management_user: () => import('./management/user/index.vue'),
  'multi-menu_first_second-new_third': () => import('./multi-menu/first/second-new/third/index.vue'),
  'multi-menu_first_second': () => import('./multi-menu/first/second/index.vue')
};
