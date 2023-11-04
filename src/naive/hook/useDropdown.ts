import { nextTick, ref, unref } from 'vue';

type callbackSelect = (key: string | number, item: any) => void;

export function useDropdown(dropdownOptions: any[] = [], callback: callbackSelect = () => false) {
  const xRef = ref(0);
  const yRef = ref(0);
  const options = ref(dropdownOptions);
  const showDropdown = ref(false);
  const activeItem = ref({});
  const handleSelect = (key: string | number) => {
    callback(key, unref(activeItem));
    showDropdown.value = false;
  };
  const handleContextMenu = (e: MouseEvent, item: any = undefined) => {
    e.preventDefault();
    if (item.id > 0) {
      showDropdown.value = false;
      activeItem.value = item;
      nextTick().then(() => {
        showDropdown.value = true;
        xRef.value = e.clientX;
        yRef.value = e.clientY;
      });
    }
  };
  const onClickOutside = () => {
    showDropdown.value = false;
  };

  return {
    xRef,
    yRef,
    options,
    showDropdown,
    activeItem,
    handleSelect,
    handleContextMenu,
    onClickOutside
  };
}
