import api from "./api";
import type {
  CreateExpenseResponse,
  Expense,
  ListExpensesResponse,
} from "../types/expense";
import _ from "lodash";

export const getExpenses = async ({
  page = 1,
  limit = 10,
}): Promise<ListExpensesResponse> => {
  const response = await api.get(`/expenses?page=${page}&limit=${limit}`);
  return response.data;
};

export const createExpense = async (
  expense: Expense
): Promise<CreateExpenseResponse> => {
  const response = await api.post("/expenses", expense);
  return response.data;
};

export const editExpense = async (
  expense: Expense
): Promise<CreateExpenseResponse> => {
  const response = await api.put(
    `/expenses/${expense._id}`,
    _.omit(expense, ["_id"])
  );
  return response.data;
};
