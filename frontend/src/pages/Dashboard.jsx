import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import MainDashboard from "./MainDashboard";
import Transactions from "./Transactions";
import RecordExpense from "./RecordExpense";
import Advice from "./Advice";
import Support from "./Support";
import Settings from "./Settings";
import HireMe from "./HireMe";
import { UserProvider } from "../context/UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiMenuAlt3 } from "react-icons/hi";

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [catexp, setCatexp] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, statRes] = await Promise.all([
          axios.get("https://expense-tracker-api-rmjc.onrender.com/api/expenses/category-wise-expenses", { withCredentials: true }),
          axios.get("https://expense-tracker-api-rmjc.onrender.com/api/expenses/monthly-expenses", { withCredentials: true })
        ]);
        
        setCatexp(catRes.data);
        setStats(statRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
  

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 bg-white shadow-lg
          transform transition-transform duration-300
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-64
        `}
      >
        <Sidebar />
      </div>

      {/* Mobile hamburger */}
      <button
        className="absolute top-4 left-4 z-50 p-2 bg-white rounded-md shadow md:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <HiMenuAlt3 size={24} />
      </button>

      {/* Main content */}
      <div className="flex-1 flex flex-col ">
        <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-8 py-6">
          <UserProvider stats={stats} catexp={catexp}>
            <Routes>
              <Route path="/" element={<MainDashboard />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="record-expense" element={<RecordExpense />} />
              <Route path="advice" element={<Advice />} />
              <Route path="support" element={<Support />} />
              <Route path="settings" element={<Settings />} />
              <Route path="hire-me" element={<HireMe />} />
            </Routes>
          </UserProvider>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
