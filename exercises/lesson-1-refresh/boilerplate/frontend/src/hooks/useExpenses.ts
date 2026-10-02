import { useEffect, useState } from "react";
import type { Expense } from "../type/Expense";

const API_URL = "/api/expenses";

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch expenses");
      }

      const data: Expense[] = await response.json();
      setExpenses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchExpenses();
  }, []);

  const addExpense = async (expense: Expense) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      if (!response.ok) {
        throw new Error("Failed to add expense");
      }

      await fetchExpenses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add expense");
    }
  };

  const resetExpenses = async () => {
    try {
      const response = await fetch(`${API_URL}/reset`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to reset expenses");
      }

      await fetchExpenses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset expenses");
    }
  };

  return { expenses, loading, error, addExpense, resetExpenses };
};

export default useExpenses;
