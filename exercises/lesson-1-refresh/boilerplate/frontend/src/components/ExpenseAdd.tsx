import type { Expense } from "../type/Expense";

interface ExpenseAddProps {
  addExpense: (expense: Expense) => void;
}

const ExpenseAdd = ({ addExpense }: ExpenseAddProps) => {
  const handleAddClick = () => {
    const id = Date.now().toString();
    const payer = ["Alice", "Bob"][Math.floor(Math.random() * 2)];
    const amount = Number((Math.random() * 100).toFixed(2));
    const newExpense: Expense = {
      id,
      date: new Date().toISOString(),
      description: `New expense ${id}`,
      payer,
      amount,
    };
    addExpense(newExpense);
  };
  return (
    <div>
      <h2>Add New Expense</h2>
      <button type="button" onClick={handleAddClick}>
        Add Expense
      </button>
    </div>
  );
};

export default ExpenseAdd;