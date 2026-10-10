import { useQuery } from '@tanstack/react-query';

import { queryKeys } from 'src/queryClient';
import campaignsService from 'src/modules/campaigns/services/campaigns';

export const useCampaigns = () => {
  const { data, isPending, error } = useQuery({
    queryKey: queryKeys.campaigns.all,
    queryFn: campaignsService.getCampaigns,
  });

  return { campaigns: data?.campaigns ?? [], loading: isPending, error };
};

export const useCampaignClicks = (id?: number) => {
  const { data, isPending, error } = useQuery({
    queryKey: queryKeys.campaigns.clicks(id ?? 0),
    queryFn: () => campaignsService.getClicks(id ?? 0),
    enabled: !!id,
  });

  return { clicks: data?.clicks ?? [], count: data?.count ?? 0, loading: isPending, error };
};

export const useCampaignCategories = (id?: number) => {
  const { data, isPending, error } = useQuery({
    queryKey: queryKeys.campaigns.categories(id ?? 0),
    queryFn: () => campaignsService.getCategories(id ?? 0),
    enabled: !!id,
  });

  return { categoryIds: data?.categoryIds ?? [], loading: isPending, error };
};
