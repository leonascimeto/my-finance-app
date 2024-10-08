import { defineStore } from "pinia";
import { createCategory, getCategories } from "../services/categoryService";
import type { Category } from "../types/category";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [] as Category[],
  }),
  actions: {
    async fetchCategories({
      page = 1,
      limit = 10,
    }: {
      page?: number;
      limit?: number;
    }) {
      const categoriesResponse = await getCategories({ page, limit });
      console.log("categories", categoriesResponse.data.docs);
      this.categories = categoriesResponse.data.docs;
    },
    async createCategory(category: Category) {
      const { data: newCategory } = await createCategory(category);
      console.log("newCategory", newCategory);
      this.categories.push(newCategory);
    },
  },
});
