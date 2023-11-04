import type { TableColumn, Records } from '@/naive/types';

export const handleColumn = (column: TableColumn, rowDisabled?: (row: Records) => boolean) => {
  if (column.type == 'selection' && rowDisabled != undefined) {
    column.disabled = rowDisabled;
  }
  if (column.children && column.children.length > 0) {
    column.children.map((item: TableColumn) => {
      return handleColumn(item, rowDisabled);
    });
  }
  // else {
  //   const types = ['selection', 'expand', undefined];
  //   if (!types.includes(column.type)) {
  //     if (column.type === 'render') {
  //     }
  //   }
  // }
  return column;
};
