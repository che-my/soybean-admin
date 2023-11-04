<template>
  <n-list class="min-h-sm px-2" clickable>
    <template #header>
      <n-button round @click="onShowCategory">
        <template #icon>
          <svg-icon icon="mdi:plus"></svg-icon>
        </template>
        添加分类
      </n-button>
    </template>
    <n-space vertical>
      <template v-for="item in categorySortList" :key="item.id">
        <n-tag
          :checked="item.checked"
          checkable
          @click="onChecked(item)"
          @contextmenu="e => handleContextMenu(e, item)"
        >
          <div class="w-130px">
            {{ item.name }}
          </div>
        </n-tag>
      </template>
    </n-space>

    <category-modal
      v-model="showCategory"
      v-model:category="category"
      :title="categoryTitle"
      :save-url="apis.saveUrl"
      @success="onSuccess"
    ></category-modal>

    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="xRef"
      :y="yRef"
      :options="options"
      :show="showDropdown"
      :on-clickoutside="onClickOutside"
      @select="handleSelect"
    />
  </n-list>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed, onMounted, ref } from 'vue';
import { NSpace, useDialog } from 'naive-ui';
import sortBy from 'lodash-es/sortBy';
import type { UrlsProps, CategoryProps } from '@/naive/types';
import { request } from '@/naive/api';
import { useDropdown } from '@/naive/hook';
import CategoryModal from './CategoryModal.vue';

const props = defineProps({
  apis: {
    type: Object as PropType<UrlsProps>,
    default: () => {
      return {
        listUrl: '/fileManager/category-list',
        saveUrl: '/fileManager/category-save',
        delUrl: '/fileManager/category-del'
      };
    }
  },
  modelValue: {
    type: Number,
    default: 1
  }
});

const emit = defineEmits(['update:modelValue', 'change']);
const showCategory = ref<boolean>(false);
const categoryTitle = ref<string>('添加分类');

const category = ref<CategoryProps>({
  id: 0,
  sort: 0,
  name: ''
});

const categoryList = ref<CategoryProps[]>([
  {
    id: 0,
    name: '全部',
    sort: 0,
    checked: true
  }
]);

const categorySortList = computed(() => sortBy(categoryList.value, item => item.sort));

const onChecked = (category: CategoryProps) => {
  categoryList.value.map((item: CategoryProps) => {
    item.checked = item === category;
    if (item.checked) {
      emit('update:modelValue', item.id);
      emit('change', item.id);
    }
    return item;
  });
};

const onShowCategory = () => {
  categoryTitle.value = '添加分类';
  showCategory.value = true;
};

/**
 * 编辑分类
 * @param item
 */
const onEditCategory = (item: CategoryProps) => {
  category.value = item;
  categoryTitle.value = '修改分类';
  showCategory.value = true;
};

/**
 * 删除分类
 * @param item
 */
const onDelCategory = (item: CategoryProps) => {
  request.delete(props.apis?.delUrl, { params: { id: item.id } }).then(() => {
    categoryList.value = categoryList.value.filter(category => category != item);
    categoryList.value[0].checked = true;
  });
};

/**
 * 分类列表
 */
const getCategoryList = () => {
  request.get(props.apis?.listUrl).then((res: any) => {
    categoryList.value = [
      {
        id: 0,
        name: '全部',
        sort: 0,
        checked: true
      },
      ...res.data.items
    ];
  });
};

onMounted(() => {
  getCategoryList();
});

const onSuccess = ({ form, item }: { form: CategoryProps; item: any }) => {
  if (!form.id) {
    categoryList.value.push(item);
  }
};
const defaultOptions = [
  {
    label: '编辑',
    key: 'edit'
  },
  {
    label: '删除',
    key: 'delete'
  }
];
const dialog = useDialog();
const { xRef, yRef, options, showDropdown, handleSelect, handleContextMenu, onClickOutside } = useDropdown(
  defaultOptions,
  (key: string | number, item: any) => {
    if (key == 'edit') {
      onEditCategory(item);
    } else {
      dialog.error({
        title: `删除分类【${item.name}】`,
        content: '删除后将删除此分类下的图片, 是否确认删除此分类吗?',
        negativeText: '取消',
        positiveText: '确认',
        onPositiveClick: () => {
          onDelCategory(item);
        }
      });
    }
  }
);
</script>

<style lang="scss" scoped>
.category-list {
  padding: 8px 20px !important;
  box-sizing: border-box !important;
  border-radius: 8px !important;
  min-width: 150px !important;
  &.active {
    background: var(--primary-color);
    color: var(--n-color);
  }
  :deep(.n-list-item__suffix) {
    flex: unset;
  }
}
</style>
