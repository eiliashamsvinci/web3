import express, { type Request, type Response } from "express";
import { addExpense, getAllExpenses, resetExpenses } from "../services/services.ts";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  const expenses = getAllExpenses();
  res.json(expenses);
});

router.post("/", (req: Request, res: Response) => {
  try {
    const newExpense = req.body;
    const addedExpense = addExpense(newExpense);
    res.json(addedExpense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Failed to add expense" });
  }
});

router.post("/reset", (_req: Request, res: Response) => {
  try {
    const resetData = resetExpenses();
    res.status(200).json({
      message: "Expenses reset successfully",
      expenses: resetData,
    });
  } catch (error) {
    console.error("Error resetting expenses:", error);
    res.status(500).json({ message: "Failed to reset expenses" });
  }
});

export default router;
