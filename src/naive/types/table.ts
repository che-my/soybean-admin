import type { VNodeChild } from 'vue';
import type {
  DataTableBaseColumn,
  DataTableColumn,
  DataTableExpandColumn,
  DataTableInst,
  DataTableProps,
  DataTableSelectionColumn,
  PaginationProps
} from 'naive-ui';
import type { Records } from './system';

export type TableColumn<T = Records> = Omit<DataTableColumn<T>, 'type'> &
  Omit<DataTableBaseColumn<T>, 'type'> &
  Omit<DataTableSelectionColumn<T>, 'type'> &
  Omit<DataTableExpandColumn<T>, 'type'> & {
    type: 'selection' | 'expand' | 'render' | undefined;
    show?: boolean;
    props?: Records;
    maps?: Records;
    isLoop?: boolean;
    colors?: Records;
    children?: Array<TableColumn<T>>;
    renderOptions?: any;
    renderExpandOptions?: any;
    // children?: Array<Column<any>>;
    render?: (rowData: Records, rowIndex: number) => VNodeChild;
    // renderExpand?: (rowData: Records, rowIndex: number)=> VNodeChild;
    // disabled?: (rowData: Records, rowIndex: number)=> boolean;
    // expandable?: (rowData: Records)=> boolean;
  };

export interface TableProps {
  name?: string;
  showActions?: boolean;
  showHeader?: boolean;
  showHeaderCollapse?: boolean;
  showSearch?: boolean;
  showFullscreen?: boolean;
  showLeftTool?: boolean;
  showRightTool?: boolean;
  actions?: Record<string, any>;
  searchForm?: Record<string, any>;
  searchModel?: Record<string, any>;
  columns?: Array<TableColumn>;
  data?: any[];
  showPage?: boolean;
  pagination?: PaginationProps;
  selectKey?: string;
  apiUrl?: string;
  rowDisabled?: (rowData: object, rowIndex: number) => boolean;
}

export interface TableInject {
  tableRef: DataTableInst | undefined;
  tableKey: string;
  class: string;
  props: DataTableProps;
  pagination: PaginationProps;
  showPage: boolean;
  showHeader: boolean;
  showHeaderCollapse: boolean;
  showFullscreen: boolean;
  showLeftTool: boolean;
  showRightTool: boolean;
  showSearch: boolean;
  fullscreen: boolean;
  loading: boolean;
  columns: any[];
  data: any[];
  searchForm: Record<string, any>;
  searchModel: Record<string, any>;
  updateColumns(newColumns: TableColumn[]): void;
  toggleHeaderCollapse(): void;
  updateFullscreen(fullscreen: boolean): void;
  updateTableRef(tableRef: DataTableInst | undefined): void;
  refresh(): void;
  onSearch(): void;
  onReset(): void;
  [index: string]: any;
}
