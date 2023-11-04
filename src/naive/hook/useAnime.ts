import { ref, unref } from 'vue';
import anime from 'animejs';
import { uuid } from '@/naive/utils';

export default function useAnime(randomClass = '', topNumber: number | string = 0, easing = 'easeInOutSine') {
  const domClass = randomClass ? randomClass : `app-anime-${uuid(8)}`;
  const target = `.${domClass}`;
  const isFullscreen = ref<boolean>(false);
  let modalHeight = 0;
  let modalWidth = 0;
  const oldModalHeight = ref(0);
  const oldModalWidth = ref(0);
  const onFullScreen = () => {
    isFullscreen.value = !isFullscreen.value;
    const clientWidth = document.body.clientWidth;
    const clientHeight = document.body.clientHeight;
    const modalDom = document.querySelector(target);
    if (isFullscreen.value) {
      oldModalHeight.value = Number(modalDom?.clientHeight);
      oldModalWidth.value = Number(modalDom?.clientWidth);
    } else {
      modalHeight = unref(oldModalHeight);
      modalWidth = unref(oldModalWidth);
    }
    anime({
      targets: target,
      width: unref(isFullscreen) ? `${clientWidth}px` : `${unref(modalWidth)}px`,
      height: unref(isFullscreen) ? `${clientHeight}px` : `${unref(modalHeight)}px`,
      top: unref(isFullscreen) ? '0px' : `${topNumber}px`,
      easing
    });
  };

  return {
    isFullscreen,
    onFullScreen
  };
}
