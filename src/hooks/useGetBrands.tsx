import { useState, useEffect } from 'react';
import { getActiveBrand } from '@/services/brand.service';
import { IBrand } from '@/lib/types/admin/brands/brand.type';

export const useGetBrands = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBrands = async () => {
      const query = {
        fields: '',
      };
      const res = await getActiveBrand(query);
      const data = res?.data?.data;
      const selectMapping = data?.map((item: IBrand) => {
        return {
          label: item?.title,
          value: item?.key,
        };
      });
      setBrands(selectMapping);
      setLoading(false);
    };

    fetchBrands();
  }, []);

  return { brands, loading };
};
