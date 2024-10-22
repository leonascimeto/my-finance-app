import type { Category } from "./category";
import type { PaginatedResponse, SimpleResponse } from "./response";

export interface Expense {
  _id?: string;
  description: string;
  amount: number;
  categories?: Category[];
  payment_method: string;
  recurrence: string;
  installments?: number;
  current_installment?: number;
  status?: string;
  payments?: Payment[];
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Payment {
  date: string;
  amount: number;
}

export type ListExpensesResponse = PaginatedResponse<Expense>;

export type CreateExpenseResponse = SimpleResponse<Expense>;
