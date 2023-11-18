<script setup lang="ts">
import { computed } from 'vue';
import { useThemeStore } from '@/store';
import { getColorPalette, mixColor } from '@/utils';
import LoginBg from './login-bg/index.vue';

defineOptions({
  name: 'AppLogin',
  inheritAttrs: false
});
interface Props {
  title: string;
  moduleName: string;
  showBg?: boolean;
}
withDefaults(defineProps<Props>(), {
  title: '',
  moduleName: '',
  showBg: true
});

const theme = useThemeStore();
const bgThemeColor = computed(() => (theme.darkMode ? getColorPalette(theme.themeColor, 7) : theme.themeColor));
const bgColor = computed(() => {
  const COLOR_WHITE = '#ffffff';
  const ratio = theme.darkMode ? 0.5 : 0.2;
  return mixColor(COLOR_WHITE, theme.themeColor, ratio);
});
</script>

<template>
  <div class="relative flex-center wh-full" :style="{ backgroundColor: bgColor }">
    <dark-mode-switch
      :dark="theme.darkMode"
      class="absolute left-48px top-24px z-3 text-20px"
      @update:dark="theme.setDarkMode"
    ></dark-mode-switch>
    <n-card :bordered="false" size="large" class="z-4 !w-auto rounded-20px shadow-sm">
      <div class="w-300px sm:w-360px">
        <header class="flex-y-center justify-between">
          <system-logo class="text-64px text-primary" />
          <n-gradient-text type="primary" :size="28">{{ title }}</n-gradient-text>
        </header>
        <main class="pt-24px">
          <h3 class="text-18px text-primary font-medium">{{ moduleName }}</h3>
          <div class="pt-24px">
            <transition name="fade-slide" mode="out-in" appear>
              <div class="w-full"><slot></slot></div>
            </transition>
          </div>
        </main>
      </div>
    </n-card>
    <login-bg v-if="showBg" :theme-color="bgThemeColor"></login-bg>
  </div>
</template>
