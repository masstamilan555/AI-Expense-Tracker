import Navbar from "../components/Navbar";
import { FaPlay } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { FaChartPie, FaRobot, FaWallet } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="relative w-screen overflow-x-hidden">
      {/* section -1 */}
      <section className="px-4 md:px-16 lg:px-32 pt-5 min-h-screen flex flex-col justify-center">
        <Navbar />
        <div className="flex flex-col lg:flex-row justify-evenly pt-10">
          <div className="mt-10 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-[120px] leading-[1.1] font-bold font-jaini">
              Experience a <br className="hidden lg:block" /> AI way to <br className="hidden lg:block" />
              <span className="text-[#2CC967]">Manage Money</span>
            </h1>
            <p className="text-gray-700 mt-6 text-lg max-w-3xl mx-auto">
              Take control of your finances like never before! With smart budgeting tools, AI-powered insights, and intuitive tracking,
              <span className="font-semibold text-[#2CC967]"> MassMoney</span> helps you spend wisely, save effortlessly, and build a financially secure future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
              <Link
                to={"/signup"}
                className="px-6 py-3 bg-[#2CC967] text-white text-lg font-semibold rounded-lg w-full sm:w-auto"
              >
                Get Started
              </Link>
              <button className="px-6 py-2 text-lg font-semibold rounded-lg border-[2px] bg-green-100 border-green-600 text-green-700 flex items-center gap-3 justify-center w-full sm:w-auto">
                <FaPlay size={14} />
                <span>Demo</span>
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-8 lg:mt-0">
            <img src="/images/hero.png" alt="AI Expense Tracker" className="max-h-[500px] lg:h-[620px]" />
            <div className="hidden lg:flex flex-col mt-16 gap-32">
              <h4 className="rotate-90 font-[600] text-wrap">Contact me</h4>
              <ul className="flex rotate-90 gap-3">
                <a href="https://www.linkedin.com/in/tamilarasu55/" className="-rotate-90 cursor-pointer">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/masstamilan555" className="-rotate-90 cursor-pointer">
                  <FaGithub />
                </a>
                <a href="https://portfolio-masstamilan.netlify.app" className="-rotate-90 cursor-pointer">
                  <CgWebsite />
                </a>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-green-500 text-white py-16 px-4 md:px-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">MassMoney Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-20 p-6 rounded-lg text-center">
            <FaWallet className="mx-auto text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Smart Budgeting</h3>
            <p className="mt-2 text-sm">Set budgets and never overspend again.</p>
          </div>

          <div className="bg-white bg-opacity-20 p-6 rounded-lg text-center">
            <FaChartPie className="mx-auto text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Visualize Spending</h3>
            <p className="mt-2 text-sm">Pie & bar charts give you instant insights.</p>
          </div>

          <div className="bg-white bg-opacity-20 p-6 rounded-lg text-center">
            <FaRobot className="mx-auto text-4xl mb-4" />
            <h3 className="text-xl font-semibold">AI‑Powered Advice</h3>
            <p className="mt-2 text-sm">Get personalized tips to grow your savings.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;