import ExpenseAdd from "../components/ExpenseAdd";
import ExpenseItem from "../components/ExpenseItem";
import useExpenses from "../hooks/useExpenses";

const Home = () => {
  const { expenses, loading, error, addExpense, resetExpenses } = useExpenses();

  return (
    <div>
      <h1>Expense Tracker</h1>

      {loading && <p>Loading expenses...</p>}
      {error && <p>Error: {error}</p>}

      <button type="button" onClick={resetExpenses}>
        Reset Expenses
      </button>
      <ExpenseAdd addExpense={addExpense} />

      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
};

export default Home;
