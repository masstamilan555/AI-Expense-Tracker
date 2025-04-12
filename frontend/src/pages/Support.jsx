import { useState } from "react";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";
import { SiGooglepay } from "react-icons/si";

const Support = () => {
  const [copied, setCopied] = useState(false);
  const upiId = "arasut075@okhdfcbank"; 
  const qrSrc = "/images/upi.jpg"; 

  const copyToClipboard = () => {
    navigator.clipboard.writeText(upiId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-10 max-w-2xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold text-center">Support the Developer</h1>
      <p className="text-center text-gray-600">
        Found this app helpful? Help me keep building by sending a small donation through Google Pay!
      </p>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Pay via Google Pay (UPI)</h2>
        <img
          src={qrSrc}
          alt="Google Pay UPI QR"
          className="w-48 h-48 mx-auto mb-4 object-contain"
        />

        <div className="flex items-center justify-center gap-2">
          <span className="font-mono text-lg">{upiId}</span>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition"
          >
            {copied ? (
              <FaClipboardCheck className="text-green-600" />
            ) : (
              <FaClipboard className="text-green-600" />
            )}
          </button>
        </div>

        {copied && (
          <p className="text-center text-green-600 mt-2">UPI ID copied!</p>
        )}

        <div className="mt-6 flex items-center gap-2 text-blue-700">
          <SiGooglepay size={28} />
          <span className="text-lg font-semibold">Google Pay Supported</span>
        </div>
      </div>
    </div>
  );
};

export default Support;
