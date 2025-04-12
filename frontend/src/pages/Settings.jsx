import { useState } from "react";
import useAuthStore from "../store/authUser";
import axios from "axios";
import {
  FaUserCircle,
  FaEnvelope,
  FaRupeeSign,
  FaChartBar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Settings = () => {
  const { user, authCheck, logout } = useAuthStore();
  const [monthlyIncome, setMonthlyIncome] = useState(user?.monthlyIncome || 0);
  const [budgetLimit, setBudgetLimit] = useState(user?.budgetLimit || 0);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const toastId = toast.loading("Saving changes...");
    try {
      await axios.put(
        "http://localhost:4000/api/user/budget",
        { monthlyIncome, budgetLimit },
        { withCredentials: true }
      );
      toast.success("Budget updated!", { id: toastId });
      // re-fetch user data
      await authCheck();
      // optional: scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-10 max-w-3xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-center">Account Settings</h1>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-xl shadow-md">
        <div className="flex items-center space-x-6">
          <FaUserCircle className="text-gray-400" size={80} />
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600 flex items-center gap-2">
              <FaEnvelope /> {user.email}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
            <FaRupeeSign className="text-green-600" size={28} />
            <div>
              <p className="text-gray-500 text-sm">Monthly Income</p>
              <p className="text-lg font-bold">₹{user.monthlyIncome}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
            <FaChartBar className="text-green-600" size={28} />
            <div>
              <p className="text-gray-500 text-sm">Budget Limit</p>
              <p className="text-lg font-bold">₹{user.budgetLimit}</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Update Form */}
      <div className="bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-xl font-semibold mb-6">Update Budget</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Monthly Income */}
            <div className="flex flex-col">
              <label htmlFor="income" className="font-medium mb-2">
                Monthly Income
              </label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <span className="px-3 text-gray-500 bg-gray-100">
                  <FaRupeeSign />
                </span>
                <input
                  type="number"
                  id="income"
                  className="flex-1 p-3 outline-none"
                  min={0}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Budget Limit */}
            <div className="flex flex-col">
              <label htmlFor="budget" className="font-medium mb-2">
                Budget Limit
              </label>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <span className="px-3 text-gray-500 bg-gray-100">
                  <FaChartBar />
                </span>
                <input
                  type="number"
                  id="budget"
                  className="flex-1 p-3 outline-none"
                  min={0}
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`w-full py-3 rounded-lg transition ${
              saving
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
