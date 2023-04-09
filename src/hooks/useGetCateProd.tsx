import { useState, useCallback, useEffect } from 'react';
// axios
import { AxiosResponse } from 'axios';
import { getCateProd } from '@/services/cateProd.service';
// import { ICateProd } from "@/lib/types/admin/cateProd.type";

export interface ItemCate {
  key?: string;
  name?: string;
  parent?: string;
  title?: string;
  value?: string;
  children?: ItemCate[];
}

export const useGetCateProd = () => {
  const [categories, setCategories] = useState<ItemCate[] | []>([
    {
      title: 'Root',
      key: 'root',
      value: 'root',
    },
  ]);

  function buildNestedStructure(
    items: ItemCate[],
    parent: ItemCate | undefined,
  ): ItemCate[] | undefined {
    const children = items.filter((item) => item.parent === parent?.key);
    if (children.length === 0) {
      return undefined;
    }

    const nestedChildren = children.map((child) => ({
      ...child,
      title: child?.name,
      value: child?.key,
      children: buildNestedStructure(items, child),
    }));

    return nestedChildren;
  }
  const fetch = useCallback(async () => {
    const query = {
      fields: 'name,parent',
    };
    const res: AxiosResponse<any> = await getCateProd(query);
    const data: ItemCate[] = res?.data?.data;
    // if (res?.data?.data) setCategories(res?.data?.data);
    const topLevelItems = data.filter((item) => item.parent === 'root');
    const nestedStructure = topLevelItems.map((item) => ({
      ...item,
      title: item?.name,
      value: item?.key,
      children: buildNestedStructure(data, item),
    }));

    console.log('nestedStructure', nestedStructure);
    setCategories(nestedStructure);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  console.log('useGet', categories);
  return { categories };
};
