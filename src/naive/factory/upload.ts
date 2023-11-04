import type { Ref } from 'vue';
import { computed, onMounted, reactive, ref, unref, watch } from 'vue';
import { useMessage } from 'naive-ui';
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider';
import { localStg } from '@/utils';
import type { DisksProps, UploadEmitType, UploadFieldProp, UploadInject, UrlsProps } from '@/naive/types';
import { request } from '@/naive/api';
import { $event, uuid } from '@/naive/utils';
import { useStore } from '@/naive/hook';

export const defaultApis: UrlsProps = {
  uploadUrl: '/fileManager/upload',
  indexUrl: '/fileManager/index',
  deleteUrl: '/fileManager/delete',
  moveUrl: '/fileManager/move',
  downloadUrl: '/admin-api/download',
  listUrl: '/fileManager/category-list',
  saveUrl: '/fileManager/category-save',
  delUrl: '/fileManager/category-del'
};

export const defaultDisks: DisksProps[] = [
  {
    name: '本地磁盘',
    disk: 'public',
    icon: 'fluent-emoji:floppy-disk',
    checked: true
  },
  {
    name: '阿里云OSS',
    disk: 'oss',
    icon: 'fluent-emoji:a-button-blood-type'
  },
  {
    name: '腾讯云COS',
    disk: 'cos',
    icon: 'mdi:cloud-upload'
  },
  {
    name: '七牛云',
    disk: 'qiniu',
    icon: 'mdi:cloud-upload',
    show: false
  }
];

export async function setHeaders(headers: Record<string, any> = {}) {
  // 设置token
  headers.Authorization = localStg.get('token') || '';
  const content = document.querySelector("[name='csrf-token']")?.getAttribute('content') || '';
  if (content) {
    headers['X-CSRF-TOKEN'] = document.querySelector("[name='csrf-token']")?.getAttribute('content') || '';
  }
  return headers;
}

export class UploadFactory {
  private readonly mode: number = 0;

  private apis: any = {};

  private props: any = {};

  private readonly $emit: any;

  public $message: MessageApiInjection;

  private timer: Ref<any> = ref<number>(0);

  private state: UploadInject = reactive<any>({
    key: 0,
    uploadRef: undefined,
    uploadKey: '',
    mode: 0,
    type_id: 0,
    filename: '', // 文件搜索
    loading: false,
    diskList: computed<DisksProps[]>(() => this.state.disks.filter(item => item.show === undefined || item.show)),
    disks: defaultDisks,
    activeDisk: computed<DisksProps>(() => {
      let itemDisk: any = {};
      unref(this.state.diskList).some((diskItem: DisksProps) => {
        if (diskItem.checked) {
          itemDisk = diskItem;
        }
        return diskItem.checked;
      });
      return itemDisk;
    }),
    disk: 'public',
    directoryList: [],
    directory: '',
    page: 1,
    pageCount: 0,
    pageSize: 10,
    total: 0,
    fileList: [],
    activeFile: {},
    directorys: computed<any[]>(() => {
      let prefix = '';
      return this.state.directory.split('/').map(item => {
        const value = prefix ? `${prefix}/${item}` : item;
        prefix = value;
        return { value, label: item };
      });
    }),
    data: computed<any>(() => {
      return {
        type_id: this.state.type_id,
        disk: this.state.disk,
        multiple: this.props.multiple ? 1 : 0,
        directory: this.state.directory
      };
    }),
    onUpdatePage: (page: number) => {
      this.state.page = page;
    },
    onUpdatePageSize: (pageSize: number) => {
      this.state.pageSize = pageSize;
      if (this.state.page === 1) {
        this.getFileList();
      } else {
        this.state.page = 1;
      }
    },
    resetList: () => {
      this.state.page = 1;
      this.getFileList();
    },
    uploadSuccess: () => {
      this.getFileList();
    },
    onClickDir: (directory = '') => {
      this.state.directory = directory;
      this.resetList();
    }
  });

  constructor(props: any, emit: any) {
    this.$message = useMessage();
    this.props = props;
    this.$emit = emit;
    this.mode = props.mode;
    this.apis = props.apis;
    this.init();
  }

  private init() {
    this.state.uploadKey = `app-upload-manager-${uuid(8)}`;
    this.state.class = 'app-upload-manager';
    if (this.props.disks) {
      this.state.disks = this.props.disks;
    }
    this.state.mode = this.mode;
    this.state.apis = this.apis;
    this.state.updateChecked = this.updateChecked;
    this.state.getFileList = this.getFileList;
    this.state.onDelete = this.onDelete;
    this.state.onBack = this.onBack;
    this.state.onSelect = this.onSelect;
    this.state.onDblSelect = this.onDblSelect;
    this.state.onConfirm = this.onConfirm;

    onMounted(() => {
      this.resetList();
    });

    watch(
      () => this.state.disk,
      () => this.resetList()
    );
    watch(
      () => this.state.page,
      () => this.getFileList(),
      {
        deep: true
      }
    );
  }

  private resetList = () => {
    this.state.page = 1;
    this.state.getFileList();
  };

  private updateChecked = (value: boolean, item: DisksProps) => {
    this.state.disks = this.state.disks.map((diskItem: DisksProps) => {
      diskItem.checked = diskItem === item;
      if (diskItem.checked) {
        this.state.disk = diskItem.disk;
        this.state.directory = '';
      }
      return diskItem;
    });
    return value;
  };

  private getFileList = () => {
    const apiUrl = this.apis?.indexUrl;
    if (!apiUrl) {
      this.$message.error('请设置apis.indexUrl路径');
      return false;
    }
    if (this.state.pageCount && this.state.page > this.state.pageCount) {
      return false;
    }
    const params = {
      type_id: this.state.type_id,
      disk: this.state.disk,
      page: this.state.page,
      filename: this.state.filename,
      directory: this.state.directory,
      pageSize: this.state.pageSize
    };
    this.state.loading = true;
    request.get(apiUrl, { params }).then((ret: any) => {
      if (ret.code == 200) {
        const data: any = ret.data;
        const items = data.items;
        if (items) {
          this.state.fileList = items;
        }
        this.state.pageCount = data.pageCount;
        this.state.total = data.total;
        this.state.directoryList = data.directoryList;
        if (this.state.page === 1) {
          this.state.key++;
        }
      }
      this.state.loading = false;
    });
  };

  private onDelete = (file: UploadFieldProp) => {
    const apiUrl = this.apis?.deleteUrl;
    if (!apiUrl) {
      this.$message?.error('请设置apis.deleteUrl路径');
      return false;
    }
    request.delete(apiUrl, { params: { id: file.id, disk: file.disk, directory: file.directory } }).then(() => {
      this.state.fileList = this.state.fileList.filter((row: UploadFieldProp) => row != file);
      this.state.total -= 1;
    });
  };

  private onBack = () => {
    if (this.state.directory) {
      const directorySplit = this.state.directory.split('/');
      this.state.onClickDir(directorySplit.slice(0, -1).join(directorySplit.length > 1 ? '/' : ''));
    }
  };

  private onSelect = (file: UploadFieldProp) => {
    if (this.timer.value) {
      // 取消上次延时未执行的方法
      clearTimeout(this.timer.value);
    }
    this.timer.value = setTimeout(() => {
      const mode = this.props.mode;
      if (this.mode > 0) {
        if (this.mode == 2) {
          if (!file.selected) {
            const selectCount = this.state.fileList.filter(filter => filter.selected).length;
            if (selectCount === this.props.maxCount) {
              this.$message.error(`最多可选择${this.props.maxCount}个文件`);
              return;
            }
          }
        }
        this.state.fileList = this.state.fileList.map((row: UploadFieldProp) => {
          if (mode == 1) {
            if (row == file) {
              row.selected = !row.selected;
            } else {
              row.selected = false;
            }
          } else if (row == file) {
            row.selected = !row.selected;
          }
          return row;
        });
      }
    }, 50);
  };

  private onDblSelect = (file: UploadFieldProp) => {
    if (this.timer.value) {
      // 取消上次延时未执行的方法
      clearTimeout(this.timer.value);
    }
    this.state.fileList = this.state.fileList.map((row: UploadFieldProp) => {
      row.selected = row.id == file.id;
      return row;
    });
    this.onConfirm();
  };

  private onConfirm = () => {
    const items = this.state.fileList?.filter(filter => {
      return filter.selected;
    });
    const images = items?.map(item => item.path);
    console.log(images);
    this.$emit('select', { images, items });
    this.$emit('update:modalValue', images);
    if (images.length > 0) {
      $event.emit(this.props.modalKey, false);
    } else {
      this.$message.error('请选择图片');
    }
  };

  public getInject() {
    const { useProvide, useInject } = useStore<UploadInject>(this.state.uploadKey);
    useProvide(this.state);
    return useInject();
  }
}

export function useUploadManager(props: any, emit: (event: UploadEmitType, ...args: any[]) => void): UploadInject {
  const factory = new UploadFactory(props, emit);
  return factory.getInject();
}

export const injectUploadManager = (uploadKey: string): UploadInject => {
  const { useInject } = useStore<UploadInject>(uploadKey);
  return useInject();
};
