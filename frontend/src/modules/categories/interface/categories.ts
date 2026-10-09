export type Category = {
  title: string;
  id: string;
  parentId?: string;
};

export type CategoriesResponse = {
  categories: Category[];
  count: number;
};

export type CategoryNode = Category & {
  level: number;
  children: CategoryNode[];
};
