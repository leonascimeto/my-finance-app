import type { PaginatedResponse, SimpleResponse } from "./response";

export interface Category {
  _id?: string;
  name: string;
  description: string;
  user?: string;
  expenses: string[];
  createdAt?: string;
}

export type ListCategoriesResponse = PaginatedResponse<Category>;

export type CreateCategoryResponse = SimpleResponse<Category>;
