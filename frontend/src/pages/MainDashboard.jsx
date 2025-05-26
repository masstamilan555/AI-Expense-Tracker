import useAuthStore from "../store/authUser";
import Cards from "../components/Cards";
import { useUserContext } from "../context/UserContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../constants/consts";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function MainDashboard() {
  const { user } = useAuthStore();
  const { stats, catexp } = useUserContext();
  const [advice, setAdvice] = useState("");

  const pieData = {
    labels: catexp.data?.map((i) => i._id) || [],
    datasets: [{ data: catexp.data?.map((i) => i.totalAmount) || [], backgroundColor: ["#FF6384","#36A2EB","#FFCE56","#4BC0C0","#9966FF","#FF9F40"] }]
  };

  const barColors = [
    "#22c55e", 
    "#3b82f6", 
    "#f97316", 
    "#e11d48", 
    "#8b5cf6", 
    "#14b8a6", 
    "#facc15", 
  ];
  
  const barData = {
    labels: catexp.data?.map((i) => i._id) || [],
    datasets: [
      {
        label: "Total Spent",
        data: catexp.data?.map((i) => i.totalAmount) || [],
        backgroundColor: catexp.data?.map((_, i) => barColors[i % barColors.length]) || [],
        borderWidth: 1,
        borderColor: "#e5e7eb", 
      },
    ],
  };
  

  const getAdvice = async () => {
    toast("Fetching your AI advice…");
    try {
      const res = await fetch(`${API_URL}/ai/advice`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats: stats, catexp: catexp }),
      });
      const { advice } = await res.json();
      setAdvice(advice);
      toast.success("Advice ready!");
    } catch {
      toast.error("Failed to get advice");
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-jaini">Welcome back, {user?.name}!</h1>
      <Cards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl mb-4">Expense Breakdown</h2>
          <Doughnut data={pieData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl mb-4">Most Spent Categories</h2>
          <Bar data={barData} options={{ indexAxis: "y", responsive: true }} />
        </div>
      </div>

      <div className="space-y-4" >
        <button
        
          onClick={getAdvice}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          {advice ? "Refresh Advice" : "Get AI Advice"}
        </button>

        {advice && (
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg max-h-64 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">💡 Financial Advice</h3>
            <pre className="whitespace-pre-wrap text-green-900 leading-relaxed">{advice}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
