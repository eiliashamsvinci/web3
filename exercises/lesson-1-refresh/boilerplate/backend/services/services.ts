
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Expense } from '../types/Expense.ts';
import { parse, serialize } from "../utils/json.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonDbPath = path.join(__dirname, "../data/expenses.json");
const initialExpensesDbPath = path.join(__dirname, "../data/expenses.init.json");

const defaultExpenses: Expense[] = [
  {
    id: "1",
    date: "2026-09-01",
    description: "Groceries",
    payer: "Alice",
    amount: 42.5,
  },
]

export function getAllExpenses(): Expense[] {
    const expenses = parse(jsonDbPath, defaultExpenses);
    return expenses;
}

export function addExpense(newExpense: Expense): Expense {
    const expenses = parse(jsonDbPath, defaultExpenses);
    expenses.push(newExpense);
    serialize(jsonDbPath, expenses);
    return newExpense;
}

export function resetExpenses(): Expense[] {
    const initialData = fs.readFileSync(initialExpensesDbPath, "utf-8");
    const resetData: Expense[] = JSON.parse(initialData) as Expense[];
    
    fs.writeFileSync(jsonDbPath, JSON.stringify(resetData, null, 2));

    return resetData;
}


