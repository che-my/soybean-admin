<template>
  <div ref="domRef" class="xg-player"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, unref } from 'vue';
import type { IPlayerOptions } from 'xgplayer';
import Player from 'xgplayer';
import 'xgplayer/dist/index.min.css';

defineOptions({
  name: 'XgPlayer'
});

interface Props {
  options?: IPlayerOptions;
}

const props = withDefaults(defineProps<Props>(), {
  options: undefined
});

const domRef = ref<HTMLElement | undefined>();
const player = ref<Player>();

const optionsRef = ref<any>({
  playbackRate: [0.5, 0.75, 1, 1.5, 2],
  fluid: true,
  ...props.options
});

function renderXgPlayer() {
  if (!domRef.value) return;
  optionsRef.value.el = domRef.value;
  player.value = new Player(unref(optionsRef) as IPlayerOptions);
}
function destroyXgPlayer() {
  player.value?.destroy();
}

onMounted(() => {
  renderXgPlayer();
});

onUnmounted(() => {
  destroyXgPlayer();
});

defineExpose({
  options: unref(optionsRef),
  player: unref(player)
});
</script>

<style scoped></style>
