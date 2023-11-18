/** 获取登录页面模块的动态路由的正则 */
export function getLoginModuleRegExp() {
  const modules: string[] = ['index', 'register'];
  return modules.join('|');
}
