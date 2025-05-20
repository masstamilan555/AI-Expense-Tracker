import { useEffect, useState } from "react";
import axios from "axios";
import { FaRobot, FaLightbulb } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { useUserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Advice = () => {
  const { stats, catexp } = useUserContext();
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      toast("Please wait,While we analze your status")
      const res = await axios.post("https://expense-tracker-api-rmjc.onrender.com/api/ai/advice", {
        stats: stats.data,
        catexp: catexp.data,
      }, { withCredentials: true });
      setAdvice(res.data.advice);
      toast.success("Analyzation completed")
    } catch (error) {
      console.log(error);
      
      setAdvice("Failed to fetch advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FaRobot className="text-green-600" />
        AI Advice Center
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md border max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
            <FaLightbulb />
            Smart Spending Tips
          </h2>
          <button
            onClick={fetchAdvice}
            className="flex items-center gap-1 text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <IoReload />
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="animate-pulse text-gray-500">Analyzing your spending habits...</p>
        ) : (
          <p className="text-gray-800 whitespace-pre-line">{advice}</p>
        )}

        <div className="text-right text-xs text-gray-400 mt-4">
          Powered by AI · {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Advice;
