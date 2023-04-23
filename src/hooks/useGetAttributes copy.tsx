import { useState, useEffect } from 'react';
import { getActiveAttribute } from '@/services/attribute.service';
import { IAttribute } from '@/lib/types/admin/attributes/attribute.type';

export const useGetAttributes = () => {
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const query = {
          fields: '',
        };
        const res = await getActiveAttribute(query);
        const data: IAttribute[] = res?.data?.data;
        setAttributes(data);
        setLoading(false);
      } catch (e: any) {
        console.log(e);
      }
    };

    fetchAttributes();
  }, []);

  return { attributes, loading };
};
