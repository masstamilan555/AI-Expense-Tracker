import TransactionCard from "../components/TransactionCard";
import axios from "axios";
import { useEffect, useState } from "react";
import formatDateTime from "../utils/formatdate";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); 
  const getExpenses = async () => {
    try {
      const res = await axios.get("https://expense-tracker-api-rmjc.onrender.com/api/expenses/all-expenses", {
        withCredentials: true,
      });
      setTransactions(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
   
    getExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://expense-tracker-api-rmjc.onrender.com/api/expenses/${id}`, {
        withCredentials: true,
      });
      setTransactions((prev) => prev.filter((item) => item._id !== id));
      getExpenses()
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">All Transactions</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading transactions...</div>
      ) : transactions.length === 0 ? (
        <div className="text-center text-gray-500">No transactions found.</div>
      ) : (
        <div className="p-10 flex flex-col gap-6">
          {transactions.map((item) => (
            <TransactionCard
              key={item._id}
              _id={item._id}
              description={item.description}
              category={item.category}
              amount={item.amount}
              date={formatDateTime(item.date)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
