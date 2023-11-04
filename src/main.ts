import SoybeanAdmin from '@/admin';
// eslint-disable-next-line default-param-last
async function appRender(dom = '#app', callback?: ADMIN.AppCallback) {
  await new SoybeanAdmin(callback).render(dom);
}

window.appRender = appRender;

if (import.meta.env.VITE_SERVICE_ENV === 'dev') {
  await appRender();
}
