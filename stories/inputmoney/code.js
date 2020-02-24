export default [
  `
  import React, { useState } from 'react';
  import {InputLanguage} from 'gantd';
  
  const Demo = () => {
    const [value, setValue] = useState(99)
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <>
      <InputMoney placeholder='不可编辑' allowEdit={false}  value={99}/>
      <InputMoney placeholder='可编辑' allowEdit={true} onSave={onSave} value={value} onChange={setValue} />
    </>
  }
  
  ReactDOM.render(
      <Demo />,
      mountNode,
  );
  `,
  
  
  
  
  
  
  
  `
  import React, { useState } from 'react';
  import {InputLanguage, SwitchStatus} from 'gantd';
  
  const Demo = () => {
    const [edit, setEdit] = useState('CANCEL')
    const [value, setValue] = useState(99)
    return <>
      <Button onClick={() => setEdit(SwitchStatus)} style={{ marginBottom: 5 }} size="small">{!(edit === 'EDIT') ? '进入编辑' : '退出编辑'}</Button>
      <InputMoney placeholder='请输入' edit={edit} value={value} onChange={setValue} style={{ margin: '5px 0' }} />
    </>
  }
  
  ReactDOM.render(
      <Demo />,
      mountNode,
  );
  `,
    
  
  
  
  `
  import React, { useState } from 'react';
  import {InputLanguage} from 'gantd';
  
  const Demo = () => {
    const [value, setValue] = useState('99')
    const onSave = (id, value, cb) => {
      console.log(id, value);
      cb()
    }
    return <>
      <InputMoney placeholder='请输入' allowEdit={true} value={value} onSave={onSave} onChange={setValue} />
    </>
  }
  
  ReactDOM.render(
      <Demo />,
      mountNode,
  );
  `,
    
  
  
  ]
  
  
  
  