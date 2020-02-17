const code =
  `import React, { useState } from 'react';
import { Avatar } from 'antd';
import { SubMenu, Icon } from 'gantd';

// 设置菜单自定义 font 图标
const SubMenuIcon = Icon.createFromIconfontCN('SubMenuIcon', {
  scriptUrl: '//at.alicdn.com/t/font_687278_5i22ts2wtbx.js'
})

function BasicUse() {
  const menuData = [
    {
      title: '个人设置',
      icon: <Icon.Submenuicon type='icon-xingming' />,
      path: 'personal',
      count: 10
    },
    {
      title: '语言偏好',
      icon: <Icon.Submenuicon type='icon-yuyan' />,
      path: 'preferences',
    },
    {
      title: '修改密码',
      icon: <Icon.Submenuicon type='icon-iconbi' />,
      path: 'editpwd',
      count: 10
    },
    {
      title: '关注领域',
      icon: <Icon.Submenuicon type='icon-mubiao' />,
      path: 'focus',
      count: 10
    },
    {
      title: '历史消息',
      icon: <Icon.Submenuicon type='icon-lishi' />,
      path: 'historymsg',
      count: 10
    },
    {
      title: '账号绑定',
      icon: <Icon.Submenuicon type='icon-bangding' />,
      path: 'accountbind',
      count: 10
    }
  ].map(item => ({ ...item, key: item.path }));

  const [selectedKey, setSelectedKey] = useState(menuData[0].path);
  const menuBoxRef = useRef(null);
  const onSelectedChange = (key, record, item) => setSelectedKey(key);
  const onSwitchChange = (mode) => {
    // console.log('当前状态', mode)
  };

   return (
    <SubMenu
      menuData={menuData}
      selectedKey={selectedKey}
      width={180}
      setMenuBoxRef={ref => { menuBoxRef.current = ref }}
      showFlipOverFooter
      onCollapseChange={(collapsed) => {
        console.log(collapsed)
        console.log(menuBoxRef)
      }}
      onSelectedChange={onSelectedChange}
      onSwitchChange={onSwitchChange}
      extra={
        <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <Avatar size={64} src={'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560143638308&di=bd43a25e740c8010cd803bffb6191a74&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201605%2F07%2F20160507191419_J2m8R.thumb.700_0.jpeg'} />
            <div style={{ textAlign: 'center' }}>777777</div>
          </div>
        </div>
      }
    >
      <div style={{ padding: '20px' }}>
        {selectedKey}
      </div>
    </SubMenu>
  )
}

ReactDOM.render(
    <BasicUse/>,
    mountNode,
);
`


const code1 =
  `import React, { useState } from 'react';
import { Avatar } from 'antd';
import { SubMenu, Icon } from 'gantd';

// 设置菜单自定义 font 图标
const SubMenuIcon = Icon.createFromIconfontCN('SubMenuIcon', {
  scriptUrl: '//at.alicdn.com/t/font_687278_5i22ts2wtbx.js'
})

function TopLayout() {
  const menuData = [
    {
      title: '个人设置',
      icon: <SubMenuIcon type='icon-xingming' />,
      path: 'personal',
      count: 100
    },
    {
      title: '语言偏好',
      icon: <SubMenuIcon type='icon-yuyan' />,
      path: 'preferences',
      count: 100
    },
    {
      title: '修改密码',
      icon: <SubMenuIcon type='icon-iconbi' />,
      path: 'editpwd',
      count: 100
    },
    {
      title: '关注领域',
      icon: <SubMenuIcon type='icon-mubiao' />,
      path: 'focus',
      count: 100
    },
    {
      title: '历史消息',
      icon: <SubMenuIcon type='icon-lishi' />,
      path: 'historymsg',
      count: 100
    },
    {
      title: '账号绑定',
      icon: <SubMenuIcon type='icon-bangding' />,
      path: 'accountbind',
      count: 100
    }
  ].map(item => ({ ...item, key: item.path }));

  const [selectedKey, setSelectedKey] = useState(menuData[0].path);

  const onSelectedChange = (key, record, item) => setSelectedKey(key);

  return (
    <SubMenu
      menuData={menuData}
      selectedKey={selectedKey}
      mode='horizontal'
      showMenuMagnet
      fixedTopHeight={0}
      onSelectedChange={onSelectedChange}
    >
      <div style={{ padding: '20px', height: 800 }}>
        {selectedKey}
      </div>
    </SubMenu>
  )
}

ReactDOM.render(
    <TopLayout/>,
    mountNode,
);
`
const code2 =
  `import React, { useState } from 'react';
import { Avatar } from 'antd';
import { SubMenu, Icon } from 'gantd';

// 设置菜单自定义 font 图标
const SubMenuIcon = Icon.createFromIconfontCN('SubMenuIcon', {
  scriptUrl: '//at.alicdn.com/t/font_687278_5i22ts2wtbx.js'
})
  
function ExtraUse() {
  const menuData = [
    {
      title: '个人设置',
      icon: <SubMenuIcon type='icon-xingming' />,
      path: 'personal',
      count: 200
    },
    {
      title: '语言偏好',
      icon: <SubMenuIcon type='icon-yuyan' />,
      path: 'preferences',
      count: 200
    },
    {
      title: '修改密码',
      icon: <SubMenuIcon type='icon-iconbi' />,
      path: 'editpwd',
      count: 200
    },
    {
      title: '关注领域',
      icon: <SubMenuIcon type='icon-mubiao' />,
      path: 'focus',
      count: 200
    },
    {
      title: '历史消息',
      icon: <SubMenuIcon type='icon-lishi' />,
      path: 'historymsg',
      count: 200
    },
    {
      title: '账号绑定',
      icon: <SubMenuIcon type='icon-bangding' />,
      path: 'accountbind',
      count: 200
    },
  ].map(item => ({ ...item, key: item.path }));

  const [selectedKey, setSelectedKey] = useState(menuData[0].path);

  const onSelectedChange = (key, record, item) => setSelectedKey(key);

  return (
    <SubMenu
      menuData={menuData}
      selectedKey={selectedKey}
      collapsed={true}
      onSelectedChange={onSelectedChange}
    >
      <div style={{ padding: '20px' }}>
        {selectedKey}
      </div>
    </SubMenu>
  )
}

ReactDOM.render(
    <ExtraUse/>,
    mountNode,
);
`
export default [code, code1,code2];