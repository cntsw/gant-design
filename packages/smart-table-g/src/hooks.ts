import { useMemo, useState, useEffect, useCallback } from 'react'
import { PaginationConfig } from '@pkgs/table-g/src'
import { merge } from 'lodash';

// localStorage相关
export function useLocalStorage<T>(storageKey: string, initValue: T): [T, (params: T) => void] {
  const getLocaLStorageData = () => {
    let localDataString = localStorage.getItem(storageKey)
    return localDataString ? merge(JSON.parse(localDataString), initValue) : initValue
  }

  const [localData, setLocalData] = useState<T>(getLocaLStorageData())

  const setLocalStorage = useCallback((list: T) => {
    setLocalData(list)
    localStorage.setItem(storageKey, JSON.stringify(
      Array.isArray(list) ? list : Object.assign({}, localData, list)
    ))
  }, [])

  return [localData, setLocalStorage]
}

// 分页相关
const getPageFromIndex = (pageIndex: number, pageSize: number): number => {
  if (!pageIndex) return 1;
  return (pageIndex / pageSize) + 1;
}
interface usePaginationProps {
  pagination?: PaginationConfig;
  pageIndex?: number;
  pageSize?: number;
  onPageChange?: (pageIndex: number, pageSize?: number) => void;
  totalCount?: number;
  pageSizeOptions?: string[];
}
export const usePagination = (props: usePaginationProps): PaginationConfig | undefined | boolean => {
  const {
    pagination,
    pageIndex = 1,
    pageSize = 50,
    onPageChange,
    totalCount = 0,
    pageSizeOptions = ['50', '100', '150', '200'],
  } = props;
  const handlerPageChange = useCallback((page: number = 1, pageSize: number = 50): void => {
    if (pagination !== undefined || !onPageChange) return;

    let fakePageIndex = (page - 1) * pageSize;
    onPageChange(fakePageIndex, pageSize)
  }, [onPageChange])
  return useMemo(() => {
    if (pagination !== undefined) return pagination;
    if (!onPageChange) return undefined;
    return {
      total: totalCount,
      current: getPageFromIndex(pageIndex, pageSize),
      pageSize: pageSize,
      onChange: handlerPageChange,
      onShowSizeChange: handlerPageChange,
      pageSizeOptions
    }
  }, [pagination, pageIndex, pageSize, onPageChange, totalCount])
}

// 表格配置相关
interface useTableConfigProps extends usePaginationProps {
  tableConfig: any,
  rowSelection: any,
  columns: any[],
  tableKey?: string,
}
export const useTableConfig = (props: useTableConfigProps) => {
  const {
    tableConfig,
    columns,

    rowSelection,

    ...paginationProps
  } = props;
  // 行选中开关
  const {
    clickable,
    columnFields = []
  } = tableConfig;
  const fakeRowSelection = useMemo(() => rowSelection ? ({
    columnWidth: 35,
    clickable,
    ...rowSelection,
  }) : undefined, [rowSelection, clickable])
  // 列渲染
  const fakeColumns = useMemo(() => columnFields
    .filter((item: any) => item.checked)
    .map((ck: any) => ({
      width: ck.fixed ? 120 : undefined,
      ...columns.find((oc: any) => oc.dataIndex === ck.dataIndex),
      fixed: ck.fixed,
      align: ck.align,
    }))
    , [columnFields, columns])
  // 分页
  const fakePagination = usePagination(paginationProps);
  return [
    fakeRowSelection,
    fakeColumns,
    fakePagination
  ]
}