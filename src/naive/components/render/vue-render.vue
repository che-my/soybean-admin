<template>
  <div class="vue-render">
    <vue-renderer
      v-if="isShow"
      :scope="toRaw(data.scope)"
      :locale="toRaw(data.locale)"
      :messages="toRaw(data.messages)"
      :pass-props="toRaw(data.passProps)"
      :components="toRaw(data.components)"
      :schema="toRaw(data.schema)"
    ></vue-renderer>
    <n-tooltip v-if="isDebug">
      <template #trigger>
        <n-icon class="debug-icon" size="16" :color="themeVars.primaryColor" @click="onShowCode">
          <svg-icon icon="mdi:code-json"></svg-icon>
        </n-icon>
      </template>
      调试信息
    </n-tooltip>
    <app-drawer v-if="isDebug" v-model="showCode" title="查看调试信息" width="800">
      <n-tabs type="segment" animated>
        <n-tab-pane name="schema" tab="Schema">
          <div class="my-1"><VueJsonView :src="data.schema" :collapsed="false"></VueJsonView></div>
        </n-tab-pane>
      </n-tabs>
    </app-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, unref, getCurrentInstance, toRaw, reactive, ref } from 'vue';
import { useThemeVars } from 'naive-ui';
import VueRenderer, { mergeScope } from '@knxcloud/lowcode-vue-renderer';
import { isString, localStg } from '@/utils';
import { useScope } from '@/naive/hook';
import { handleRender } from '@/naive/utils';
import type { EntryOptions } from '@/naive/types';
import { AppDrawer } from '../common';
import { VueJsonView } from '../async';

defineOptions({ name: 'VueRender' });

interface Props {
  options: any;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => {}
});

const themeVars = useThemeVars();
const ctx = getCurrentInstance();
const isDebug = computed(() => window.appConfig?.debug || false);
const data = reactive<EntryOptions>({} as unknown as EntryOptions);
const language = ref<I18nType.LangType>(localStg.get('lang') || 'zh-CN');

const init = async () => {
  let options: any;
  if (isString(props.options)) {
    options = JSON.parse(props.options) as EntryOptions;
  } else {
    options = JSON.parse(JSON.stringify(props.options)) as EntryOptions;
  }
  const messages = options.messages || {};
  const schema: any = options.schema || {};
  const scope = options.scope || {};
  const passProps = options.passProps || {};
  Object.assign(scope, useScope());
  const locale = computed(() => options.locale || language.value);
  Object.assign(data, await handleRender(options), { locale, scope: mergeScope(scope), messages, schema, passProps });
  data.components = reactive({
    ...data.components,
    ...ctx?.appContext.components
  });
};

onMounted(async () => {
  await init();
});

const isShow = computed(() => unref(data).schema && unref(data).components);
const showCode = ref(false);
const onShowCode = () => {
  showCode.value = !showCode.value;
};
</script>
