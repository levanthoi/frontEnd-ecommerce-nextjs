import { useState, useEffect } from 'react';
import { getBrand } from '@/services/brand.service';
import { IBrand } from '@/lib/types/admin/brands/brand.type';

export const useGetBrands = () => {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBrands = async () => {
      const query = {
        fields: '',
      };
      const res = await getBrand(query);
      if (res) setBrands(res.data.data);
      setLoading(false);
    };

    fetchBrands();
  }, []);

  return { brands, loading };
};
