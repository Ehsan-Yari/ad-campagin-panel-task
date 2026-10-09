import type {
  Campaign,
  ClicksResponse,
  CampaignsResponse,
  CreateCampaignPayload,
  UpdateCampaignPayload,
} from 'src/modules/campaigns/interface/campaigns';

import axiosClient from 'src/api/axios';
import { endpoints } from 'src/api/endpoints';

export default {
  getCampaigns: async () => {
    const res = await axiosClient.get<CampaignsResponse>(endpoints.campaigns.list);
    return res.data;
  },
  createCampaign: async (payload: CreateCampaignPayload) => {
    const res = await axiosClient.post<Campaign>(endpoints.campaigns.list, payload);
    return res.data;
  },
  updateCampaign: async ({ id, ...changes }: UpdateCampaignPayload) => {
    const res = await axiosClient.patch<Campaign>(endpoints.campaigns.detail(id), changes);
    return res.data;
  },
  getClicks: async (id: number) => {
    const res = await axiosClient.get<ClicksResponse>(endpoints.campaigns.clicks(id));
    return res.data;
  },
};
