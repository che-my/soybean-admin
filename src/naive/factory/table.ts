import { h, mergeProps, nextTick, onMounted, reactive, useAttrs } from 'vue';
import { useRoute } from 'vue-router';
import type { DataTableInst, DataTableProps } from 'naive-ui';
import { NTag } from 'naive-ui';
import type { TableColumn, TableInject } from '@/naive/types';
import { uuid } from '@/naive/utils';
import { request } from '@/naive/api';
import { useStore } from '@/naive/hook';
import { handleColumn } from './utils';

export class TableFactory {
  private readonly props: any = {};

  private readonly $emit: any;

  private state: TableInject = reactive<any>({
    tableRef: undefined,
    props: {
      size: 'medium'
    },
    fullscreen: false,
    loading: false,
    pagination: {},
    columns: [],
    data: [],
    updateFormRef(tableRef: DataTableInst | undefined) {
      this.state.tableRef = tableRef;
    },
    updateColumns: (newColumns: TableColumn[]) => {
      this.state.columns = newColumns;
    },
    toggleHeaderCollapse: () => {
      this.state.showHeaderCollapse = !this.state.showHeaderCollapse;
    },
    updateFullscreen: (fullscreen: boolean) => {
      this.state.fullscreen = fullscreen;
    },
    updateTableRef: (tableRef: DataTableInst | undefined) => {
      this.state.tableRef = tableRef;
    },
    refresh: async () => {
      await this.fetchList();
    },
    onSearch: async () => {
      this.state.pagination.page = 1;
      await this.fetchList();
    },
    onReset: async () => {
      if (this.state.searchModel) {
        for (const key in this.state.searchModel) {
          if (Object.hasOwn(this.state.searchModel, key)) {
            this.state.searchModel[key] = '';
          }
        }
      }
      this.state.pagination.page = 1;
      await this.fetchList();
    }
  });

  constructor(props: any, emit: TableEmitProp) {
    this.props = props;
    this.$emit = emit;
    this.init();
  }

  private init() {
    const randomClass = `app-table-${uuid(8)}`;
    this.state.tableKey = randomClass;
    this.state.class = randomClass;
    Object.assign(this.state, this.props);
    const rowKey = (row: any) => row[this.props.selectKey] || row.key;
    const defaultProps = {
      size: 'medium',
      rowKey
    };
    this.state.props = mergeProps(defaultProps, useAttrs()) as DataTableProps;
    this.state.columns = this.initColumns();
    this.initPagination();
    const route = useRoute();
    const query = route.query;
    onMounted(async () => {
      if (this.state.props?.remote && this.props.apiUrl) {
        if (query) {
          if (query.page != undefined) {
            this.state.pagination.page = Number(query.page) || 1;
          }
          if (query.pageSize != undefined) {
            this.state.pagination.pageSize = Number(query.pageSize) || 10;
          }
          await this.fetchList();
        }
      } else {
        this.state.data = this.props.data;
      }
    });
  }

  private initColumns() {
    const rowDisabled = this.props.rowDisabled;
    return this.props.columns?.map((column: TableColumn) => {
      return handleColumn(column, rowDisabled);
    });
  }

  private initPagination() {
    const defaultPage = {
      page: 1,
      pageSize: 10,
      showSizePicker: true,
      pageCount: 1,
      itemCount: 0,
      pageSizes: [10, 20, 50, 100, 200, 500, 1000],
      prefix({ itemCount }: any) {
        return h(NTag, { type: 'info' }, () => `共计: ${itemCount} 条`);
      },
      ...this.props.pagination
    };

    this.state.pagination = this.props.showPage
      ? reactive({
          ...defaultPage,
          onChange: async (page: number) => {
            this.state.pagination.page = page;
            await this.fetchList();
          },
          onUpdatePageSize: async (pageSize: number) => {
            this.state.pagination.pageSize = pageSize;
            this.state.pagination.page = 1;
            await this.fetchList();
          }
        })
      : undefined;
  }

  private async fetchList() {
    await nextTick(() => {
      this.state.loading = true;
      let params = {};
      if (this.state.pagination) {
        params = {
          page: this.state.pagination.page || 1,
          pageSize: this.state.pagination.pageSize || 10,
          filterValues: {},
          searchModel: this.state.searchModel
        };
      } else {
        params = {
          page: 1,
          pageSize: 999999,
          filterValues: {},
          searchModel: this.state.searchModel
        };
      }
      // console.log(Object.assign(route.query,params))
      // window.history.replaceState('', '', "?"+qs.stringify(Object.assign(route.query,params)))
      request.get(this.state.apiUrl, { params }).then((res: any) => {
        const { items, total } = res.data;
        if (items) {
          this.$emit('success', items);
          this.state.data = items.map((item: any, index: number) => {
            item.key = index;
            return item;
          });
          if (this.state.pagination) {
            this.state.pagination.itemCount = total;
          }
        }
        this.state.loading = false;
      });
    });
  }

  public getInject(): TableInject {
    const { useProvide, useInject } = useStore<TableInject>(this.state.tableKey);
    useProvide(this.state);
    return useInject();
  }
}

export const useTable = (props: any, emit: TableEmitProp): TableInject => {
  const factory = new TableFactory(props, emit);
  return factory.getInject();
};

export const injectTable = (tableKey: string): TableInject => {
  const { useInject } = useStore<TableInject>(tableKey);
  return useInject();
};

export const tableProps = {
  name: undefined,
  searchForm: undefined,
  searchModel: undefined,
  actions: undefined,
  pagination: undefined,
  columns: undefined,
  data: undefined,
  showPage: false,
  showSearch: false,
  showHeader: false,
  showHeaderCollapse: false,
  showLeftTool: false,
  showRightTool: false,
  showFullscreen: true,
  selectKey: '',
  apiUrl: '',
  rowDisabled: undefined
};

export type TableEmitProp = (event: 'success', ...args: any[]) => void;
