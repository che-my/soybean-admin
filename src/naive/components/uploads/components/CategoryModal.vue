<template>
  <app-modal v-model="showCategory" :title="title" top="-200" :width="400" :height="280" @change="onChange">
    <AppForm
      class="p-4 pt-0"
      :model="form"
      :rules="categoryRules"
      :show-footer="true"
      label-placement="left"
      label-width="auto"
      label-align="left"
      @submit="onSubmit"
    >
      <n-form-item label="分类名称" path="name">
        <n-input v-model:value="form.name" placeholder="请输入分类名称" clearable />
      </n-form-item>
      <n-form-item label="分类排序" path="sort">
        <n-input-number v-model:value="form.sort" placeholder="请输入分类排序" clearable />
      </n-form-item>
    </AppForm>
  </app-modal>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { FormRules } from 'naive-ui';
import { request } from '@/naive/api';
import type { FormInject, CategoryProps } from '@/naive/types';
import { AppModal } from '../../common';
import { AppForm } from '../../forms';

interface Props {
  modelValue: boolean;
  title: string;
  saveUrl: string;
  category: CategoryProps;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  saveUrl: '',
  title: '添加分类'
});

const emit = defineEmits(['close', 'success', 'update:category', 'update:modelValue']);

const categoryRules: FormRules = {
  name: {
    required: true,
    message: '请输入分类名称',
    trigger: ['input']
  }
};
const showCategory = ref(props.modelValue);
const form = ref<CategoryProps>(props.category);

watch(
  () => props.modelValue,
  () => {
    showCategory.value = props.modelValue;
  }
);

watch(
  () => props.category,
  () => {
    form.value = props.category;
  }
);

const resetCategory = () => {
  showCategory.value = false;
  emit('update:modelValue', showCategory.value);
  setTimeout(() => {
    emit('update:category', {
      id: 0,
      name: '',
      sort: 0
    });
  }, 800);
};

const onChange = (value: boolean) => {
  if (!value) {
    resetCategory();
  }
};

/**
 * 保存分类
 */
const onSubmit = (state: FormInject) => {
  if (props.saveUrl) {
    request.post(props.saveUrl, state.data).then((ret: any) => {
      if (ret.type === 'success') {
        const item = ret.data.item;
        emit('success', {
          form: state.data,
          item
        });
        resetCategory();
      }
    });
  } else {
    window.$message?.error('请设置好urls.saveUrl请求配置!');
  }
};
</script>

<style scoped></style>
