import { QueryCache, QueryClient, MutationCache } from '@tanstack/react-query';

import { toast } from 'src/components/snackbar';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => toast.error(error.message),
  }),
  mutationCache: new MutationCache({
    onError: (error) => toast.error(error.message),
  }),
});

export const queryKeys = {
  categories: ['categories'],
  campaigns: {
    all: ['campaigns'],
    clicks: (id: number) => ['campaigns', id, 'clicks'],
    categories: (id: number) => ['campaigns', id, 'categories'],
  },
};
