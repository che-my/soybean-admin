export declare interface UploadFieldProp {
  id: string;
  url: string;
  aggregate_type: string;
  basename: string;
  disk: string;
  mime_type: string;
  directory: string;
  extension: string;
  path: string;
  size: string;
  type_id: string;
  selected?: boolean;
}

export declare interface UrlsProps {
  /** 文件上传地址 */
  uploadUrl: string;
  /** 文件列表地址 */
  indexUrl: string;
  /** 文件移动分类地址 */
  moveUrl: string;
  /** 删除文件url */
  deleteUrl: string;
  /** 文件下载地址 */
  downloadUrl: string;
  /** 分类列表 */
  listUrl: string;
  /** 添加与保存分类 */
  saveUrl: string;
  /** 删除分类 */
  delUrl: string;
}

export declare interface DisksProps {
  name: string;
  disk: string;
  icon: string;
  show?: boolean;
  checked?: boolean;
}

export declare interface FileManagerProps {
  urls: UrlsProps;
}

export type UploadEmitType = 'update:modalValue' | 'select';

export interface CategoryProps {
  id: number;
  name: string;
  sort: number;
  checked?: boolean;
}

export interface UploadInject {
  key: number;
  uploadKey: string;
  class: string;
  /**
   * 0=不选,1=单选,2=多选
   */
  mode: number;
  apis: UrlsProps;
  type_id: number;
  filename: string; // 文件搜索
  loading: boolean;
  diskList: DisksProps[];
  activeDisk: DisksProps;
  disks: DisksProps[];
  disk: string;
  directoryList: string[];
  directory: string;
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
  fileList: UploadFieldProp[];
  activeFile?: UploadFieldProp;
  directorys: any;
  data: any;
  updateChecked: (value: boolean, item: DisksProps) => void;
  getFileList: () => void;
  onUpdatePage: (page: number) => void;
  onUpdatePageSize: (pageSize: number) => void;
  resetList: () => void;
  uploadSuccess: () => void;
  onClickDir: (directory: string) => void;
  onDelete: (file: UploadFieldProp) => void;
  onBack: () => void;
  onSelect: (file: UploadFieldProp) => void;
  onDblSelect: (file: UploadFieldProp) => void;
  onConfirm: () => void;
}
