<template>
  <div class="flex-col-center gap-24px min-h-520px wh-full overflow-hidden">
    <div class="flex text-400px text-primary">
      <svg-icon v-if="type === '403'" local-icon="no-permission"></svg-icon>
      <svg-icon v-if="type === '404'" local-icon="not-found"></svg-icon>
      <svg-icon v-if="type === '500'" local-icon="service-error"></svg-icon>
    </div>
    <router-link v-if="props.back" :to="{ name: props.backName }">
      <n-button type="primary">回到首页</n-button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { routeName } from '@/router';

defineOptions({ name: 'ExceptionBase' });

type ExceptionType = '403' | '404' | '500';

interface Props {
  /** 异常类型 403 404 500 */
  type: ExceptionType;
  back?: boolean;
  backName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  back: true,
  backName: routeName('root')
});
</script>

<style scoped></style>
