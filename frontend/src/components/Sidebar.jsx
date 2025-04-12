import { NavLink } from "react-router-dom";
import { FaTableCellsLarge } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { RiGeminiFill } from "react-icons/ri";
import { FaHandHoldingHeart } from "react-icons/fa";
import { IoMdSettings, IoMdContacts } from "react-icons/io";

const Sidebar = () => {
  const base = "flex items-center gap-2 py-2 px-4 rounded";
  const active = "bg-green-100 text-green-700 font-semibold";

  return (
    <nav className="h-full flex flex-col px-4 pt-6">
      <div className="flex items-center gap-2 mb-10">
        <img src="/images/massmoney.png" alt="Logo" className="h-8 w-8" />
        <h3 className="font-emblema text-xl">MassMoney</h3>
      </div>

      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) => `${base} ${isActive ? active : "text-gray-700"}`}
      >
        <FaTableCellsLarge /> Dashboard
      </NavLink>
      <NavLink
        to="/dashboard/transactions"
        className={({ isActive }) => `${base} ${isActive ? active : "text-gray-700"}`}
      >
        <MdHistory /> All Transactions
      </NavLink>
      <NavLink
        to="/dashboard/record-expense"
        className={({ isActive }) => `${base} ${isActive ? active : "text-gray-700"}`}
      >
        <IoIosCreate /> Record Expense
      </NavLink>
      <NavLink
        to="/dashboard/advice"
        className={({ isActive }) => `${base} ${isActive ? active : "text-gray-700"}`}
      >
        <RiGeminiFill /> Advice Center
      </NavLink>
      <NavLink
        to="/dashboard/support"
        className={({ isActive }) => `${base} ${isActive ? active : "text-gray-700"}`}
      >
        <FaHandHoldingHeart /> Support Dev
      </NavLink>

      <div className="border-t my-4"></div>

      <NavLink
        to="/dashboard/settings"
        className={({ isActive }) => `${base} ${isActive ? active : "text-gray-700"}`}
      >
        <IoMdSettings /> Settings
      </NavLink>
      <NavLink
        to="/dashboard/hire-me"
        className={({ isActive }) => `${base} ${isActive ? active : "text-gray-700"}`}
      >
        <IoMdContacts /> Hire Me
      </NavLink>
    </nav>
  );
};

export default Sidebar;
