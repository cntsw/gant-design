import React, { useState, useRef, useMemo } from 'react'
import { Button, Switch, Radio } from 'antd'
import { EditStatus, SwitchStatus } from '@pkgs/gantd/src/index'
import FormSchema from '@pkgs/schema-form-g/src'
import { schema, operateSchema, editStatusSchema, configSchma } from './schema'
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js'

function BasicUse() {
    const uiSchema = {
        "ui:col": 24,
        "ui:gutter": 10,
        "ui:labelCol": 4,
        "ui:wrapperCol": 20,
    }
    const [edit, setEdit] = useState(EditStatus.EDIT)
    const formRef = useRef(null)

    const onSubmit = async () => {
        if (!formRef.current) return;
        const { errors, values: formValues } = await formRef.current.validateForm()
        console.log('formValues', formValues)
    }
    return <div style={{ margin: 10 }}>
        <FormSchema
            wrappedComponentRef={formRef}
            edit={edit}
            schema={schema}
            uiSchema={uiSchema}
        />
        <div style={{ float: 'right' }}>
            <Button type='primary' onClick={onSubmit}>提交</Button>
        </div>
    </div>
}

function EditStatusUse() {
    const uiSchema = {
        "ui:col": 24,
        "ui:gutter": 10,
        "ui:labelCol": 4,
        "ui:wrapperCol": 20,
    }
    const [edit, setEdit] = useState(EditStatus.EDIT)
    const [state, setState] = useState({})
    const formRef = useRef(null)
    const onChange2 = (val, vals) => {
        setState(vals)
    }
    const onSubmit = async () => {
        if (!formRef.current) return;
        const { errors, values: formValues } = await formRef.current.validateForm()
        console.log('formValues', formValues)
    }
    const titleConfig = {
        "title:extra": (
            <Radio.Group size='small' onChange={(e) => setEdit(e.target.value)} value={edit}>
                <Radio.Button value={EditStatus.EDIT}>写</Radio.Button>
                <Radio.Button value={EditStatus.CANCEL}>读</Radio.Button>
            </Radio.Group>
        )
    }
    return <div style={{ margin: 10 }}>
        <FormSchema
            wrappedComponentRef={formRef}
            edit={edit}
            schema={editStatusSchema}
            data={state}
            uiSchema={uiSchema}
            onChange={onChange2}
            titleConfig={titleConfig}
        />
        <div style={{ float: 'right' }}>
            <Button type='primary' onClick={onSubmit}>提交</Button>
        </div>
    </div>
}

function OperatorUse() {

    const uiSchema = {
        "ui:col": 8,
        "ui:gutter": 10,
        "ui:labelCol": 8,
        "ui:wrapperCol": 16,
    }
    const formRef = useRef(null)

    const onSearch = async () => {
        if (!formRef.current) return;
        const { errors, values: formValues } = await formRef.current.validateForm()
        console.log('formValues', formValues)
    }
    const onReset = () => {
        if (!formRef.current) return;
        formRef.current.resetFields()
    }

    return <div style={{ margin: 10 }}>
        <FormSchema
            wrappedComponentRef={formRef}
            edit={EditStatus.EDIT}
            schema={operateSchema}
            uiSchema={uiSchema}
        />
        <div style={{ float: 'right' }}>
            <Button type='primary' onClick={onSearch}>搜索</Button>
            <Button onClick={onReset} style={{ marginLeft: 5 }}>重置</Button>
        </div>
    </div>
}

function CustomOptions() {
    const [uiSchema, setUiSchema] = useState({
        "ui:col": 24,
        "ui:gutter": 10,
        "ui:labelCol": 4,
        "ui:wrapperCol": 20,
        "ui:labelAlign": "left",
        "ui:padding": 10,
        "ui:backgroundColor": "#fff"
    })
    const configUI = {
        "ui:labelCol": 6,
        "ui:wrapperCol": 18,
        backgroundColor: {
            "ui:labelCol": 24,
            "ui:wrapperCol": 24,
        }
    }
    const [state, setState] = useState({});
    const data = useMemo(() => {
        const newData = {}
        Object.keys(uiSchema).map(keyname => {
            const name = keyname.replace('ui:', "");
            newData[name] = uiSchema[keyname]
        })
        return newData
    }, [uiSchema])
    const onChange = (val) => {
        const newData = {}
        Object.keys(val).map(keyname => {
            newData[`ui:${keyname}`] = val[keyname]
        });
        setUiSchema(uiSchema => ({ ...uiSchema, ...newData }))
    }
    const onChange2 = (val, vals) => {
        console.log("onChange2", vals)
        setState(vals)
    }
    const Reset = () => {
        setState({})
    }
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <FormSchema schema={schema} data={state}
                        uiSchema={uiSchema}
                        onChange={onChange2}
                    />
                </div>
                <div style={{ width: 400, marginLeft: 20 }}>
                    <FormSchema schema={configSchma} uiSchema={configUI} data={data} onChange={onChange} />
                </div>
            </div>
            <div style={{ float: 'right' }}><Button onClick={Reset}>重置</Button></div>
        </div>
    )
}

function GridLayout() {
    const uiSchema = {
        "ui:col": {
            xxl: 6,
            xl: 8,
            lg: 8,
            md: 12,
            sm: 24,
            xs: 24,
        },
        "ui:labelCol": {
            span: 24,
            sm: 6
        },
        "ui:wrapperCol": {
            span: 24,
            sm: 18
        }

    }
    return <div style={{ margin: 10 }} >
        <FormSchema uiSchema={uiSchema} schema={schema} />
    </div>
}

const config = {
    codes: code,
    useage: <>
        <p>表单是业务开发中最常见的业务场景，复杂表单的复杂程度往往需要我们使用大量的代码与时间去构建一个表单业务。FormSchema的需求由此诞生：</p>
        <ul>
            <li>1.通过json数据快速的构建出复杂表单；</li>
            <li>2.通过表单的结构，能够快速判断出该json结构的唯一性；</li>
        </ul>
    </>,
    children: [
        {
            title: '基本用法',
            describe: '',
            cmp: BasicUse
        },
        {
            title: '编辑状态切换',
            describe: '',
            cmp: EditStatusUse
        },
        {
            title: '带操作符后缀',
            describe: '',
            cmp: OperatorUse
        },
        {
            title: '自定义UI配置',
            describe: '',
            cmp: CustomOptions
        },
        {
            title: '自适应布局',
            describe: '',
            cmp: GridLayout
        },
    ]
};

export default () => <CodeDecorator config={config} />