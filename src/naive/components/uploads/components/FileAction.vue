<template>
  <n-space justify="space-between" style="padding: 2px 10px">
    <n-tooltip v-if="mode > 0" trigger="hover">
      <template #trigger>
        <n-button size="tiny" @click.stop="$emit('preview')">
          <n-icon color=""><svg-icon icon="mdi:eye-circle-outline"></svg-icon></n-icon>
        </n-button>
      </template>
      查看
    </n-tooltip>
    <n-tooltip v-else trigger="hover">
      <template #trigger>
        <n-button size="tiny" @click.stop="$emit('edit')"><svg-icon icon="mdi:edit-outline"></svg-icon></n-button>
      </template>
      编辑与裁剪
    </n-tooltip>
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button size="tiny" tag="a" :href="downloadUrl" :download="basename">
          <svg-icon icon="mdi:download-outline"></svg-icon>
        </n-button>
      </template>
      下载
    </n-tooltip>
    <n-tooltip trigger="hover">
      <template #trigger>
        <n-button size="tiny" @click.stop="$emit('delete')">
          <n-icon color="red"><svg-icon icon="mdi:delete-outline"></svg-icon></n-icon>
        </n-button>
      </template>
      删除
    </n-tooltip>
  </n-space>
</template>

<script setup lang="ts">
defineOptions({ name: 'ListItem' });
interface Props {
  mode: number;
  basename: string;
  downloadUrl: string;
}
defineProps<Props>();
defineEmits(['preview', 'edit', 'delete']);
</script>

<style scoped></style>
