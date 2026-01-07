export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface SearchCategoriesQuery {
  limit?: number;
  page?: number;
}
