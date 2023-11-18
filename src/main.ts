import SoybeanAdmin from '@/admin';
async function appRender(dom = '#app', callback: ADMIN.AppCallback | undefined = undefined) {
  await new SoybeanAdmin(callback).render(dom);
}

window.appRender = appRender;

if (import.meta.env.VITE_SERVICE_ENV === 'dev') {
  await appRender();
}
