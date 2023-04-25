import React, { useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useLanguage } from '@/hooks/useLanguage';
import * as icon from '@/icons';

interface Props {
  columns: any;
  handleAddColumn: (a: any) => void;
}

const AddColumn: React.FC<Props> = ({ columns, handleAddColumn = () => {} }) => {
  const { t } = useLanguage();

  const defaultCheckedList = columns?.map((column: any) => column?.title) || [];

  const [visible, setVisible] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(true);
  console.log('checkedList', checkedList);
  // useEffect(() => {
  //   console.log('useEffect');
  //   handleAddColumn(checkedList);
  // }, [checkedList]);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < defaultCheckedList.length);
    setCheckAll(list.length === defaultCheckedList.length);
    handleAddColumn(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(defaultCheckedList);
    setIndeterminate(false);
    setCheckAll(true);
    handleAddColumn(defaultCheckedList);
  };
  return (
    <div className="relative">
      <Button
        className="text-green-700 bg-green-200"
        icon={<icon.AiOutlineShop />}
        onClick={() => setVisible(!visible)}
      />
      {visible && (
        <>
          <div className="fixed inset-0 -z-1" onClick={() => setVisible(false)} />
          <div className="absolute top-full w-[220px] bg-white rounded-md p-2 z-50 shadow-sm shadow-slate-600">
            <Checkbox onChange={onCheckAllChange} indeterminate={indeterminate} checked={checkAll}>
              {t.showAll}
            </Checkbox>
            <Checkbox.Group onChange={onChange} className="flex-col" value={checkedList}>
              {columns?.map((column: any) => (
                <Checkbox key={column?.title} value={column?.title || ''}>
                  {column?.title}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </div>
        </>
      )}
    </div>
  );
};

export default AddColumn;
