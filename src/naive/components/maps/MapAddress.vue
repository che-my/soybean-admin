<script setup lang="ts">
import type { Ref } from 'vue';
import { computed, onMounted, ref, unref } from 'vue';
import { useMap, useTencentMap } from '@/naive/hook/useMap';
import MapHeader from './MapHeader.vue';
import MapError from './MapError.vue';
interface Props {
  value?: string | number;
  lat?: string | number;
  lng?: string | number;
  defaultValue?: any;
  defaultLat?: string | number;
  defaultLng?: string | number;
}
defineOptions({
  name: 'MapAddress',
  inheritAttrs: false
});
withDefaults(defineProps<Props>(), {
  lat: '',
  lng: '',
  value: '',
  defaultValue: '',
  defaultLat: 30.290756,
  defaultLng: 120.074387
});
defineEmits(['change']);
const modelLat: Ref<any> = defineModel('lat', {
  default: (props: Props) => props.defaultLat
});
const modelLng: Ref<any> = defineModel('lng', {
  default: (props: Props) => props.defaultLng
});
const modelValue: Ref<any> = defineModel('value', {
  default: (props: Props) => props.defaultValue
});
const { page, keyword, show, message, options } = useMap();
const { mapRef, mapRow, initLoad, getAddress, searchAddress } = useTencentMap();
const center = computed(() => ({
  lat: Number(modelLat.value),
  lng: Number(modelLng.value)
}));
const setAddress = () => {
  getAddress(
    center,
    ({ result }: any) => {
      console.log(result);
      // @ts-ignore
      const component = result.address_component;
      let address = component.province + component.city + component.district;
      if (component.street_number) {
        address += component.street_number;
      } else {
        address += component.street;
      }
      modelValue.value = address;
    },
    (error: any) => {
      if (error.status !== 0) {
        message.value = error.message;
        window.$message?.error(error.message);
      } else {
        message.value = '';
      }
      console.log(error);
    }
  );
};

const onSearch = () => {
  if (!keyword.value) {
    window.$message?.error('请输入地址搜索');
    return false;
  }
  searchAddress(
    keyword.value,
    ({ data }: any) => {
      options.value = options.value.concat(data);
      show.value = true;
    },
    page.value
  );
};

// 初始化加载完成事件
const events = {
  dblclick: print,
  click: (e: any) => {
    const latLng = e.latLng;
    modelLat.value = latLng.lat;
    modelLng.value = latLng.lng;
    setAddress();
  }
};

const onClickOption = (option: any) => {
  const location = option.location;
  modelLat.value = location.lat;
  modelLng.value = location.lng;
  modelValue.value = option.address;
  show.value = false;
  keyword.value = '';
  options.value = [];
  page.value = 1;
};
const timer = ref<any>(0);
const init = () => {
  clearInterval(timer.value);
  initLoad().then(() => {
    setAddress();
  });
};
onMounted(() => {
  if (window.TMap === undefined) {
    timer.value = setInterval(() => {
      if (window.TMap !== undefined) {
        init();
      }
    }, 500);
  } else {
    init();
  }
});
const onDown = () => {
  page.value++;
  onSearch();
};
const markData = computed(() => ({
  id: 'mark-layer',
  styles: {
    pointStyle: {
      width: 25,
      height: 35,
      anchor: { x: 16, y: 0 }
    }
  },
  geometries: [
    {
      id: 'point',
      styleId: 'pointStyle',
      position: unref(center)
    }
  ]
}));
</script>

<template>
  <n-space vertical>
    <map-header
      v-model:keyword="keyword"
      v-model:show="show"
      :options="options"
      @search="onSearch"
      @tap-click="onClickOption"
      @down="onDown"
    ></map-header>
    <tmap-map ref="mapRef" v-bind="mapRow" :events="events" :center="center">
      <tmap-multi-marker :id="markData.id" :styles="markData.styles" :geometries="markData.geometries" />
      <tmap-info-window :position="center" :content="modelValue" :visible="true" />
      <map-error :message="message"></map-error>
    </tmap-map>
  </n-space>
</template>
