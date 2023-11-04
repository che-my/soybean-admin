import { reactive, ref, unref, useAttrs, watch } from 'vue';
type thenType = (res: any) => void;

export function useMap() {
  const page = ref(0);
  const keyword = ref('');
  const show = ref(false);
  const message = ref<string>('');
  const options = ref<any[]>([]);
  watch(
    () => keyword.value,
    (newVal, oldVal) => {
      if (newVal != oldVal) {
        page.value = 1;
        options.value = [];
      }
    }
  );
  return {
    page,
    keyword,
    show,
    message,
    options
  };
}

export function useTencentMap() {
  const service = ref<any>(null);
  const geocoder = ref<any>(null);
  const mapRef = ref<HTMLElement | null>(null);
  const initGeocoder = () => {
    geocoder.value = new service.value.Geocoder();
  };
  const initService = () => {
    service.value = window.TMap.service;
  };
  const initSuggestion = () => {};

  const searchAddress = (keyword: string, thenFunc: thenType, page = 1) => {
    const Suggestion = new service.value.Suggestion({ pageSize: 20, page });
    // @ts-ignore
    Suggestion.getSuggestions({ keyword }).then(thenFunc);
  };

  const getLocation = (center: any) => {
    return new window.TMap.LatLng(center.lat, center.lng);
  };

  const getAddress = (center: any, thenFunc: thenType, catchFunc: thenType) => {
    if (!geocoder.value) return false;
    // @ts-ignore
    geocoder.value
      .getAddress({ location: getLocation(unref(center)) })
      .then(thenFunc)
      .catch(catchFunc);
  };

  const attrs = useAttrs();

  const mapRow = reactive({
    mapKey: 'JK5BZ-UVXK2-DFXUF-CQCI5-O5CN7-GQFXD',
    zoom: 15,
    libraries: ['service'],
    ...attrs
  });
  const initLoad = () => {
    return new Promise(resolve => {
      initService();
      initGeocoder();
      initSuggestion();
      resolve(true);
    });
  };
  return {
    mapRow,
    mapRef,
    searchAddress,
    getAddress,
    initLoad
  };
}
