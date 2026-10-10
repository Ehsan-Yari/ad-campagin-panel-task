export type BudgetField = 'costPerClick' | 'dailyBudget' | 'totalBudget';

export type Budget = Record<BudgetField, number>;

export type Campaign = Budget & {
  id: number;
  title: string;
  allCategories: boolean;
  createdAt: string;
  clicksCount: number;
};

export type CampaignsResponse = {
  campaigns: Campaign[];
  count: number;
};

export type CreateCampaignPayload = Budget & {
  title: string;
  allCategories: boolean;
  categoryIds: string[];
};

export type UpdateCampaignPayload = Partial<Budget> & {
  id: number;
};

export type Click = {
  id: number;
  clickedAt: string;
};

export type ClicksResponse = {
  clicks: Click[];
  count: number;
};

export type CampaignCategoriesResponse = {
  categoryIds: string[];
};
