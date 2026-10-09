import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from 'src/queryClient';
import campaignsService from 'src/modules/campaigns/services/campaigns';

export const useCreateCampaign = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: campaignsService.createCampaign,
    onSuccess: () => client.invalidateQueries({ queryKey: queryKeys.campaigns.all }),
  });
};

export const useUpdateCampaign = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: campaignsService.updateCampaign,
    onSuccess: () => client.invalidateQueries({ queryKey: queryKeys.campaigns.all }),
  });
};
