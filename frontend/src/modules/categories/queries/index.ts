import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/queryClient';
import categoriesService from 'src/modules/categories/services/categories';

export const useCategories = () => {
  const { data, isPending, error } = useQuery({
    queryKey: queryKeys.categories,
    queryFn: categoriesService.getCategories,
    staleTime: Infinity,
  });

  return { categories: data?.categories ?? [], loading: isPending, error };
};
