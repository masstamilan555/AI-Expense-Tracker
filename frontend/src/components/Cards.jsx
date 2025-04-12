import { PiCurrencyInrDuotone, PiPiggyBankBold } from "react-icons/pi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { RiGeminiFill } from "react-icons/ri";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const cardBase = `
  group bg-white border rounded-lg p-5 flex flex-col justify-between
  transition-transform duration-300 ease-in-out transform
  hover:scale-105 hover:bg-green-600 hover:text-white hover:border-transparent
  cursor-pointer
`;

export default function Cards() {
  const { stats } = useUserContext();
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {/* Income */}
      <div className={cardBase}>
        <div className="flex justify-between items-center">
          <PiCurrencyInrDuotone
            size={48}
            className="text-green-600 group-hover:text-white"
          />
          <HiOutlineDotsHorizontal />
        </div>

        <div>
          <p className="text-gray-400 group-hover:text-white">
            TOTAL INCOME
          </p>
          <h3 className="text-2xl font-bold">
            ₹{stats.monthlyIncome || 0}
          </h3>
        </div>

        {stats.monthlyIncome ? (
          <Link to="/dashboard/settings" className="group-hover:text-white">Update your income</Link>
        ) : (
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="
              mt-4 w-full 
              bg-white text-green-600 
              font-semibold 
              py-3 rounded-lg 
              border border-green-600
              hover:bg-green-600 hover:text-white hover:border-white
              transition
            "
          >
            Set Your Income
          </button>
        )}
      </div>


      {/* Expenses */}
      <div className={cardBase}>
        <div className="flex justify-between items-center">
          <BiSolidPurchaseTagAlt size={48} className="text-green-600 group-hover:text-white" />
          <HiOutlineDotsHorizontal />
        </div>
        <div>
          <p className="text-gray-400 group-hover:text-white">TOTAL EXPENSES</p>
          <h3 className="text-2xl font-bold">₹{stats.totalExpenses || 0}</h3>
        </div>
        <Link
          to="/dashboard/transactions"
          className="text-green-600 group-hover:text-white"
        >
          Check transactions
        </Link>
      </div>

      {/* Saved */}
      <div className={cardBase}>
        <div className="flex justify-between items-center">
          <PiPiggyBankBold size={48} className="text-green-600 group-hover:text-white" />
          <HiOutlineDotsHorizontal />
        </div>
        <div>
          <p className="text-gray-400 group-hover:text-white">SAVED THIS MONTH</p>
          <h3 className="text-2xl font-bold">₹{stats.remainingBalance || 0}</h3>
        </div>
        <p className="text-sm mt-2 group-hover:text-white">
          {(() => {
            const inc = stats.monthlyIncome || 1;
            const saved = stats.remainingBalance || 0;
            const pct = (saved / inc) * 100;
            if (pct < 10) return "😭 Treat yo’self... but maybe less.";
            if (pct < 30) return "🙌 Not bad! You're getting there.";
            if (pct < 60) return "💪 Wallet’s looking strong.";
            return "🧠 Financial master detected.";
          })()}
        </p>
      </div>

      {/* AI Advice */}
      <Link to="/dashboard/advice" className={cardBase}>
        <div className="flex justify-between items-center">
          <RiGeminiFill size={48} className="text-green-600 group-hover:text-white" />
          <HiOutlineDotsHorizontal />
        </div>
        <div>
          <p className="text-gray-400 group-hover:text-white">Get AI Advice</p>
          <h3 className="text-2xl font-bold">Try Now</h3>
        </div>
      </Link>
    </div>
  );
}
