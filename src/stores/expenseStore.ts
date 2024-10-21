import { defineStore } from "pinia";
import {
  getExpenses,
  createExpense,
  editExpense,
} from "../services/expenseService";
import type { Expense } from "../types/expense";

export const useExpenseStore = defineStore("expense", {
  state: () => ({
    expenses: [] as Expense[],
  }),
  actions: {
    async fetchExpenses({
      page = 1,
      limit = 10,
    }: {
      page?: number;
      limit?: number;
    }) {
      const expensesResponse = await getExpenses({ page, limit });
      this.expenses = expensesResponse.data.docs;
    },
    async createExpense(expense: Expense) {
      const { data: newExpense } = await createExpense(expense);
      this.expenses.push(newExpense);
    },
    async editExpense(expense: Expense) {
      const index = this.expenses.findIndex((e) => e._id === expense._id);
      const editResponse = await editExpense(expense);
      this.expenses[index] = editResponse.data;
    },
  },
});
