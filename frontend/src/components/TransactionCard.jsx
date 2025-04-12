import {
  IoFastFoodOutline,
  IoExtensionPuzzleOutline
} from "react-icons/io5";
import {
  MdOutlineEmojiTransportation,
  MdOutlineMovie,
  MdOutlineShoppingBag
} from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";

const icons = {
  Food: <IoFastFoodOutline size={28} />,
  Transport: <MdOutlineEmojiTransportation size={28} />,
  Shopping: <MdOutlineShoppingBag size={28} />,
  Bills: <FaFileInvoiceDollar size={28} />,
  Entertainment: <MdOutlineMovie size={28} />,
  Others: <IoExtensionPuzzleOutline size={28} />
};

const TransactionCard = ({
  _id,
  category,
  date,
  description,
  amount,
  onDelete
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white border rounded-lg shadow hover:shadow-lg transition p-4">
      <div className="flex items-start md:items-center flex-1">
        <div className="bg-gray-200 p-2 rounded-full mr-4 flex-shrink-0">
          {icons[category] || <GiWallet size={28} />}
        </div>
        <div>
          <h3 className="font-semibold">{category}</h3>
          <p className="text-gray-500 text-sm">{new Date(date).toLocaleString()}</p>
          {description && (
            <p className="text-gray-600 text-sm mt-1">{description}</p>
          )}
        </div>
      </div>

      <div className="mt-4 md:mt-0 md:ml-6 flex items-center space-x-4">
        <span className="text-lg font-medium">₹{amount}</span>
        <button
          onClick={() => onDelete(_id)}
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;
