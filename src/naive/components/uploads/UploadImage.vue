<template>
  <upload-driver
    directory-dnd
    v-bind="attrs"
    :action="uploadUrl"
    :multiple="multiple"
    :data="params"
    list-type="image-card"
  ></upload-driver>
</template>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue';
import UploadDriver from './components/UploadDriver.vue';
defineOptions({ name: 'UploadImage', inheritAttrs: false });
interface Props {
  uploadUrl: string;
  disk: string;
  directory: string;
  typeId: string | number;
  field: string;
  multiple: boolean;
  modalValue: Array<string> | string;
  apiPrefix: string;
}
const props = withDefaults(defineProps<Props>(), {
  uploadUrl: '/fileManager/upload',
  disk: 'public',
  directory: '',
  typeId: 0,
  field: 'file',
  multiple: false,
  modalValue: '',
  apiPrefix: ''
});
defineEmits(['update:modalValue']);

const params = computed<any>(() => {
  return {
    type_id: props.typeId,
    disk: props.disk,
    multiple: props.multiple ? 1 : 0,
    directory: props.directory,
    upload_field: props.field
  };
});
const attrs = useAttrs();
</script>

<style scoped></style>
