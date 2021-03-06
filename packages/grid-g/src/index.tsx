import React, { useState, useCallback, useRef, useMemo, useEffect, Dispatch, SetStateAction } from 'react';
import classnames from 'classnames'
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ColGroupDef, GridApi, GridOptions, ColumnApi, GridReadyEvent, SelectionChangedEvent } from "ag-grid-community";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { LicenseManager } from "ag-grid-enterprise"
import 'ag-grid-enterprise';
import { Pagination, Spin } from 'antd'
import { get, isEmpty, isEqual } from 'lodash'
import key from './license'
import {
    mapColumns, NonBool, isbool, isstring, isarray, ispromise, isfunc,
    flattenTreeData, usePagination, getSizeClassName, createFakeServer, createServerSideDatasource
} from './utils'
import { Filter, Size, Fixed, GridPropsPartial, RowSelection, Record } from './interface'
import "./style"
import DataManage from './datamanage'
import RenderCol from './GirdRenderColumn'

export * from './interface'
export { default as DataManage } from './datamanage'

import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver'
import en from './locale/en-US'
import zh from './locale/zh-CN'

LicenseManager.setLicenseKey(key)

const langs = {
    'en': en,
    'zh-cn': zh
}

export const defaultProps = {
    /**加载状态 */
    loading: false,
    resizable: true,
    /**是否处于编辑状态 */
    editable: false,
    /**单列的过滤器 */
    filter: false,
    /**禁止调整列顺序 */
    // lockPosition: false,
    /**直接在列头下面显示过滤器 */
    floatingFilter: false,
    /**编辑状态下的尺寸 */
    size: Size.small,
    /**rowkey */
    rowkey: "key",
    width: "100%",
    height: 400,
    sortable: true,
    treeDataChildrenName: "children"
}

export const defaultRowSelection: RowSelection = {
    type: "multiple",
    // checkboxIndex: 0,
    showDefalutCheckbox: true,
    selectedKeys: [],
    rowMultiSelectWithClick: true,
    rowDeselection: true
}

const Grid = function Grid<T extends Record>(props: GridPropsPartial<T>) {

    const {
        dataSource: initDataSource,
        // headerProps,
        // editActions,
        onReady,
        columns: columnDefs,
        editable,
        rowSelection: rowSel,
        size,
        rowkey,
        resizable,
        filter,
        sortable,
        width,
        height,
        treeData,
        pagination,
        loading,
        isServer,
        isServerSideGroup,
        getServerSideGroupKey,
        frameworkComponents,
        treeDataChildrenName,
        locale: customLocale,
        serverGroupExpend,
        groupDefaultExpanded,
        ...orignProps
    } = props

    const apiRef = useRef<GridApi>();

    const columnsRef = useRef<ColumnApi>();

    /**编辑时数据 */
    const [manageData, setManageData] = useState(initDataSource)

    // 处理selection
    const gantSelection: RowSelection = useMemo(() => {
        if (rowSel === true) {
            return defaultRowSelection
        }
        if (rowSel) return { ...defaultRowSelection, ...rowSel }
        return {}
    }, [rowSel])
    const { onSelect, selectedKeys, showDefalutCheckbox, type: rowSelection, defaultSelectionCol, ...selection } = gantSelection;


    const getRowNodeId = useCallback((data) => {
        if (typeof rowkey === 'string') {
            return get(data, rowkey)
        }
        return rowkey(data)
    }, [rowkey])
    /**管理编辑数据对象 */
    const dataManage = useMemo(() => {
        const manager = new DataManage<T>(apiRef, columnsRef)
        manager.removeAllListeners()
        manager.on("update", (list) => {
            setManageData(list)
        })
        DataManage.getRowNodeId = getRowNodeId
        DataManage.treeDataChildrenName = treeDataChildrenName
        return manager
    }, [])

    useEffect(() => {
        dataManage.init(initDataSource)
    }, [initDataSource])
    /**fix: 解决保存时候标记状态无法清楚的问题 */
    useEffect(() => {
        apiRef.current && apiRef.current.refreshCells({ force: true })
    }, [manageData])

    /**出口数据，用于grid显示 */
    useEffect(() => {
        if (editable) {
            dataManage.edit()
        }
    }, [editable])

    // 分页事件
    const computedPagination = usePagination(pagination)

    // 判断数据分别处理 treeTable 和普通table
    const dataSource = useMemo(() => {
        if (!treeData) return manageData;
        if (!isServer) return flattenTreeData(manageData, getRowNodeId, [], treeDataChildrenName);
        return []
    }, [manageData, treeData, treeDataChildrenName, getRowNodeId])
    const serverModel = useMemo(() => {
        return isServer && treeData
    }, [isServer && treeData])
    const serverDataCallback = useCallback((groupkeys, successCallback) => {
        return (rows) => {
            successCallback(rows, rows.length);
            dataManage.appendChild(groupkeys, rows)
        }
    }, [])
    const serverDataRequest = useCallback((groupkeys, successCallback) => {
        if (serverGroupExpend) {
            return serverGroupExpend(serverDataCallback(groupkeys, successCallback))
        }
        return successCallback([], 0)
    }, [serverGroupExpend])

    useEffect(() => {
        if (!serverModel) return
        const fakeServer = createFakeServer(dataManage, getServerSideGroupKey ? getServerSideGroupKey : getRowNodeId, treeDataChildrenName);
        const serverDataSource = createServerSideDatasource(fakeServer, serverDataRequest)
        apiRef.current && apiRef.current.setServerSideDatasource(serverDataSource)
    }, [serverModel, treeDataChildrenName, serverDataRequest, apiRef.current])

    const gridPartProps = useMemo(() => {
        if (treeData && isServer) return {
            isServerSideGroup,
            treeData,
            rowModelType: 'serverSide',
            getServerSideGroupKey: getServerSideGroupKey ? getServerSideGroupKey : getRowNodeId,
        }
        return {
            treeData,
            rowData: dataSource
        }
    }, [dataSource, getRowNodeId, isServerSideGroup, treeData, isServer])

    const onGridReady = useCallback((params: GridReadyEvent) => {
        apiRef.current = params.api
        columnsRef.current = params.columnApi
        onReady && onReady(params, dataManage)
    }, [onReady])

    const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
        const rows = event.api.getSelectedRows();
        const keys = rows.map(item => getRowNodeId(item))
        typeof onSelect === "function" && onSelect(keys, rows);
    }, [onSelect, getRowNodeId])
    // 处理selection- 双向绑定selectKeys
    useEffect(() => {
        if (selectedKeys && apiRef.current) {
            const gridSelectedKeys = apiRef.current.getSelectedNodes();
            const allKeys = [...gridSelectedKeys.map(item => getRowNodeId(get(item, 'data', {}))), ...selectedKeys];
            if (allKeys.length == 0 || isEqual(allKeys) === selectedKeys) return;
            allKeys.map(id => {
                const nodeItem = apiRef.current.getRowNode(id);
                if (!nodeItem) return
                if (selectedKeys.indexOf(id) >= 0) nodeItem.setSelected(true, rowSelection === 'single');
                else nodeItem.setSelected(false)
            })
        }
    }, [selectedKeys, apiRef.current, rowSelection, getRowNodeId])
    // 处理selection-end
    //columns
    const defaultSelection = !isEmpty(gantSelection) && showDefalutCheckbox
    const columns = useMemo<ColDef[] | ColGroupDef[]>(() => {
        return mapColumns<T>(columnDefs, editable, size, getRowNodeId, defaultSelection, defaultSelectionCol, rowSelection)
    }, [columnDefs, editable, rowSelection, size, getRowNodeId, defaultSelectionCol, defaultSelection, rowSelection])
    //columns-end
    const getDataPath = useCallback((data) => {
        return data.treeDataPath;
    }, [])

    const cellValueChanged = useCallback(
        (changed) => {
            dataManage.modify(changed)
        }, [])
    return (
        <LocaleReceiver>
            {(local, localeCode = 'zh-cn') => {
                let lang = langs[localeCode] || langs['zh-cn']
                const locale = { ...lang, ...customLocale }
                return <Spin spinning={loading}>
                    <div style={{ width, height }} className={classnames('gant-grid', `gant-grid-${getSizeClassName(size)}`)} >
                        <div className="ag-theme-balham" style={{ width: '100%', height: computedPagination ? 'calc(100% - 30px)' : '100%' }}>
                            <AgGridReact
                                frameworkComponents={{
                                    "gantRenderCol": RenderCol,
                                    ...frameworkComponents
                                }}
                                onSelectionChanged={onSelectionChanged}
                                columnDefs={columns}
                                rowSelection={rowSelection}
                                getRowNodeId={getRowNodeId}
                                onGridReady={onGridReady}
                                undoRedoCellEditing
                                enableFillHandle
                                defaultColDef={{
                                    resizable,
                                    sortable,
                                    filter,
                                    minWidth: 100,
                                }}
                                headerHeight={24}
                                floatingFiltersHeight={20}
                                getDataPath={getDataPath}
                                rowHeight={size == "small" ? 24 : 32}
                                singleClickEdit
                                {...gridPartProps}
                                {...selection}
                                {...orignProps}
                                suppressRowDrag
                                onCellValueChanged={cellValueChanged}
                                deltaRowDataMode
                                groupDefaultExpanded={groupDefaultExpanded}
                                localeText={locale}
                            />
                        </div>
                        {/* 分页高度为30 */}
                        {computedPagination && <Pagination className="gant-grid-pagination" {...computedPagination} />}
                    </div>
                </Spin>
            }}
        </LocaleReceiver>
    )
}

Grid.defaultProps = defaultProps

export default Grid
