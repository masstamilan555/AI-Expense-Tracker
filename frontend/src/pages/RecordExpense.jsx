import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
const RecordExpense = () => {

  const [amount, setAmount] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const createTransaction = async () => {
      try {
        setAmount(0)
        setDescription("")
        
        await axios.post("http://localhost:4000/api/expenses/create", { amount, category, description },
          { withCredentials: true })
          toast.success("transaction recorded successfully!!!")
      } catch (error) {
        console.log(error);
        toast.error("failed to record the transaction")

      }

    }
    createTransaction()
  }
  return (
    <div className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Record New Expense</h1>
      <form className="space-y-6 bg-white p-6 rounded-lg shadow-md border" onSubmit={handleSubmit} >
        {/* Amount */}
        <div className="flex flex-col">
          <label htmlFor="amount" className="font-semibold mb-2">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            className="p-3 border rounded-lg outline-green-500"
            required
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}

          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="font-semibold mb-2">Category</label>
          <select
            id="category"
            name="category"
            className="p-3 border rounded-lg outline-green-500"
            required
            onChange={(e) => setCategory(e.target.value)}

          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description" className="font-semibold mb-2">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Add a short note"
            className="p-3 border rounded-lg outline-green-500"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}

          />
        </div>



        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"

        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default RecordExpense;
