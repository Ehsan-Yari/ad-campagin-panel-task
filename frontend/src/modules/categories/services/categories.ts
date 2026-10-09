import type { CategoriesResponse } from 'src/modules/categories/interface/categories';

import axiosClient from 'src/api/axios';
import { endpoints } from 'src/api/endpoints';

export default {
  getCategories: async () => {
    const res = await axiosClient.get<CategoriesResponse>(endpoints.categories);
    return res.data;
  },
};
