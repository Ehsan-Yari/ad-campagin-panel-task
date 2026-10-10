export const endpoints = {
  categories: '/api/categories',
  campaigns: {
    list: '/api/campaigns',
    detail: (id: number) => `/api/campaigns/${id}`,
    clicks: (id: number) => `/api/campaigns/${id}/clicks`,
    categories: (id: number) => `/api/campaigns/${id}/categories`,
  },
};
