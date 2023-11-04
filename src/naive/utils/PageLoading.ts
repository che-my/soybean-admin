import { defineComponent, h } from 'vue';
import { NEl, NResult } from 'naive-ui';
import { useIconRender } from '@/composables';

const PageLoading = defineComponent({
  setup() {
    const { iconRender } = useIconRender();
    return () =>
      h(NEl, { class: 'wh-full flex-center' }, () =>
        h(
          NResult,
          { title: '正在加载中' },
          {
            icon: () => h(iconRender({ icon: 'eos-icons:bubble-loading', fontSize: 96, color: 'var(--primary-color)' }))
          }
        )
      );
  }
});

export { PageLoading as default };
