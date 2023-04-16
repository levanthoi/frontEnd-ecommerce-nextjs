import { useState, useCallback, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { getCateProd } from '@/services/cateProd.service';

export interface ItemCate {
  key?: string;
  name?: string;
  parent?: string;
  title?: string;
  value?: string;
  children?: ItemCate[];
}

const categoryMapping = (category: ItemCate): ItemCate => ({
  ...category,
  title: category?.name,
  value: category?.key,
});

// This function builds a nested tree structure of categories by finding all the children
// of the parent category and recursively calling itself on each child.
function buildNestedStructure(
  items: ItemCate[],
  parent: ItemCate | undefined,
): ItemCate[] | undefined {
  // Find all children of parent category
  const children = items.filter((item) => item.parent === parent?.key);

  // Base case: return undefined if there are no children
  if (children.length === 0) {
    return undefined;
  }

  // Recursively build tree structure for each child
  const nestedChildren = children.map((child) => ({
    ...categoryMapping(child),
    children: buildNestedStructure(items, child),
  }));

  return nestedChildren;
}

export const useGetCateProd = () => {
  const [categories, setCategories] = useState<ItemCate[] | []>([
    {
      title: 'Root',
      key: 'root',
      value: 'root',
    },
  ]);

  const fetch = useCallback(async () => {
    const fields = 'name,parent';
    const query = { fields };

    const categoryResponse: AxiosResponse<any> = await getCateProd(query);
    const result: ItemCate[] = categoryResponse?.data?.data;

    const topLevelItems = result.filter((item) => item.parent === 'root');
    const nestedStructure = topLevelItems.map((item) => ({
      ...categoryMapping(item),
      children: buildNestedStructure(result, item),
    }));

    setCategories(nestedStructure);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { categories };
};
