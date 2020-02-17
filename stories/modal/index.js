import React, { useState, useContext, useMemo } from 'react'
import { Button, Switch } from 'antd'
import Modal, { ResizableModal, ResizableProvider, ModalContext } from '@pkgs/modal-g/src'
import CodeDecorator from '../_util/CodeDecorator'
import code from './code.js'
const ButtonGroup = Button.Group;

function BasicUse() {
    const [visible, setVisible] = useState(false)
    return (
        <div style={{ margin: 10 }}>
            <div style={{ marginBottom: 10 }}>
                <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
            </div>
            <Modal
                title='默认弹窗'
                visible={visible}
                onCancel={() => { setVisible(false) }}
            >
                默认宽高520
            </Modal>
        </div>
    )
}
function CustomUse() {
    const [visible, setVisible] = useState(false);
    const [widthAndHei, setWidthAndHei] = useState([400, 400]);
    const onSizeChange = (width, height) => {
        setWidthAndHei([width, height])
    }
    return (
        <div style={{ margin: 10 }}>
            <div style={{ marginBottom: 10 }}>
                <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
            </div>
            <Modal
                title='自定义属性标题'
                itemState={{ height: 400, width: 400 }}
                visible={visible}
                footer={null}
                onCancel={() => { setVisible(false) }}
                onSizeChange={onSizeChange}
            >
                <div>
                    <h4>动态宽高获取:</h4>
                    <div>{`width:${widthAndHei[0]}px`}</div>
                    <div>{`height:${widthAndHei[1]}px`}</div>
                </div>
            </Modal>
        </div>
    )
}

// function PositionUse() {
//     const [visible, setVisible] = useState(false);
//     const [widthAndHei, setWidthAndHei] = useState([400, 400]);
//     const onSizeChange = (width, height) => {
//         setWidthAndHei([width, height])
//     }
//     return (
//         <div style={{ margin: 10 }}>
//             <div style={{ marginBottom: 10 }}>
//                 <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
//             </div>
//             <Modal
//                 title='自定义属性标题'
//                 itemState={{ x: 50, y: 50 }}
//                 visible={visible}
//                 maxZIndex={12}
//                 footer={null}
//                 onCancel={() => { setVisible(false) }}
//                 onSizeChange={onSizeChange}
//             >
//                 自定义弹出位置
//             </Modal>
//         </div>
//     )
// }

function MaximizeUse() {
    const [visible, setVisible] = useState(false)
    return (
        <div style={{ margin: 10 }}>
            <div style={{ marginBottom: 10 }}>
                <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
            </div>
            <Modal
                title='最大化弹窗'
                itemState={{ maximized: true }}
                visible={visible}
                onCancel={() => { setVisible(false) }}
            >
            </Modal>
        </div>
    )
}

function ForbiddenUse() {
    const [visible, setVisible] = useState(false)
    return (
        <div style={{ margin: 10 }}>
            <div style={{ marginBottom: 10 }}>
                <Button size="small" onClick={() => { setVisible(true) }}>触发弹窗</Button>
            </div>
            <Modal
                title='功能禁止的状态弹窗'
                visible={visible}
                canMaximize={false}
                canResize={false}
                onCancel={() => { setVisible(false) }}
            >
            </Modal>
        </div>
    )
}


function multipleModalsUse() {
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    return (
        <ResizableProvider>
            <div style={{ marginBottom: 10 }}>
                <ButtonGroup style={{ marginRight: 10 }}>
                    <Button size="small" onClick={() => { setVisible(true) }}>第一个弹窗</Button>
                    <Button size="small" onClick={() => { setVisible2(true) }}>第二个弹窗</Button>
                </ButtonGroup>
            </div>
            <ResizableModal
                id='1'
                title='第一个弹窗'
                visible={visible}
                footer={null}
                onCancel={() => { setVisible(false) }}
            >
                第一个弹窗-content
            </ResizableModal>
            <ResizableModal
                itemState={{ height: 400, width: 400 }}
                id='2'
                title='第二个弹窗'
                okBtnSolid
                visible={visible2}
                onCancel={() => { setVisible2(false) }}
            >
                第二个弹窗-content
            </ResizableModal>
        </ResizableProvider>
    )
}

const config = {
    codes: code,
    useage: '这是一个弹出式对话框。支持拖拽移动和大小伸缩、窗口化和全屏化状态的切换、实时响应浏览器窗口变化、模态窗口模式等功能，并支持同屏展示多个弹出框。',
    inline: true,
    children: [
        {
            title: '基本用法',
            describe: '最简单的用法，默认模态窗口、宽高520，鼠标悬浮到弹窗右下角边界，会出现能大小伸缩的图标，拖动则即时更改弹窗大小',
            cmp: BasicUse
        },
        {
            title: '自定义宽高的弹窗',
            describe: '设置符合场景需求的弹窗大小，可通过回调获取即时的宽高值',
            cmp: CustomUse
        },
        // {
        //     title: '自定义弹出位置的弹窗',
        //     describe: '',
        //     cmp: PositionUse
        // },
        {
            title: '默认最大化状态弹窗',
            describe: '弹窗打开时以最大化模式进行展开',
            cmp: MaximizeUse
        },
        {
            title: '功能禁止的状态弹窗',
            describe: '对是否可以改变弹窗尺寸、是否可最大化最小化切换的属性的控制',
            cmp: ForbiddenUse
        },
        {
            title: '同屏多弹窗模式',
            describe: '支持同屏多非模态型的弹窗，可通过点击改变当前选中弹窗层级',
            cmp: multipleModalsUse
        },
    ]
};

export default () => <CodeDecorator config={config} />