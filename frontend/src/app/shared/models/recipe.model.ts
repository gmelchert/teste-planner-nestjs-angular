import { Category } from './category.model';

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string | string[];
  instructions: string | string[];
  preparationTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  categoryId: number;
  category: Category;
  createdAt: string;
}

export interface RecipeQueryParams {
  search?: string;
  categoryId?: number | null;
}
