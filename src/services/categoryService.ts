
import api from './api'
import type { Category, CreateCategoryResponse, ListCategoriesResponse } from '../types/category'

export const getCategories = async ({page = 1, limit = 10}) : Promise<ListCategoriesResponse>  => {
  const response = await api.get(`/categories?page=${page}&limit=${limit}`)
  return response.data
}

export const createCategory = async (category: Category) : Promise<CreateCategoryResponse> => {
  const response = await api.post('/categories', category)
  return response.data
}