import { useState, useEffect } from 'react';
import { getAttribute } from '@/services/attribute.service';
import { IAttribute } from '@/lib/types/admin/attributes/attribute.type';

export const useGetAttributes = () => {
  const [attributes, setAttributes] = useState<IAttribute[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAttributes = async () => {
      const query = {
        fields: '',
      };
      const res = await getAttribute(query);
      if (res) setAttributes(res.data.data);
      setLoading(false);
    };

    fetchAttributes();
  }, []);

  return { attributes, loading };
};
