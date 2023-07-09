import React, { useState } from 'react';
import { Tabs } from 'antd';

import dynamic from 'next/dynamic';

const Child = dynamic(() => import('@/components/admin/sales/Child'), {
  ssr: false,
});

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initItems = [
  {
    label: 'Hoá đơn 1',
    children: <Child />,
    key: '1',
  },
];

const TabSale: React.FC = () => {
  const [items, setItems] = useState(initItems);
  const [activeKey, setActiveKey] = useState(initItems[0].key);
  // const newTabIndex = useRef(0);

  // onChange
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  // add
  const add = () => {
    const newActiveKey = `${items.length + 1}`;
    const newPanes = [...items];
    newPanes.push({
      label: `Hóa đơn ${newActiveKey}`,
      children: <Child />,
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  // remove
  const remove = (targetKey: TargetKey) => {
    console.log('target', targetKey);
    const newPanes = items.filter((item) => item.key !== targetKey);

    setItems(newPanes);
    setActiveKey(`${newPanes.length}`);
  };

  //
  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <div>
      <Tabs
        activeKey={activeKey}
        items={items}
        type="editable-card"
        onEdit={onEdit}
        onChange={onChange}
      />
    </div>
  );
};

export default TabSale;
