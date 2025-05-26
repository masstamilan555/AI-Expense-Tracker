import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;

      if (scrollPos < 300) setActiveSection("home");
      else if (scrollPos < 800) setActiveSection("feature");
      else if (scrollPos < 1300) setActiveSection("demo");
      else setActiveSection("contact");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="h-16 flex justify-between items-center px-4 md:px-16 fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="flex items-center gap-4 font-emblema">
        <img src="/images/massmoney.png" alt="logo" className="h-12 w-12" />
        <h2 className="text-2xl cursor-pointer">MassMoney</h2>
      </div>

      <ul className="hidden md:flex gap-8 lg:gap-16 items-center font-rubik">
        <a
          href="#"
          className={`${
            activeSection === "home" ? "text-green-400 font-semibold" : ""
          } hover:text-green-500 transition`}
        >
          Home
        </a>
        <a
          href="#feature"
          className={`${
            activeSection === "feature" ? "text-green-400 font-semibold" : ""
          } hover:text-green-500 transition`}
        >
          Features
        </a>
        <a
          href="#demo"
          className={`${
            activeSection === "demo" ? "text-green-400 font-semibold" : ""
          } hover:text-green-500 transition`}
        >
          Demo
        </a>
        <a
          href="#contact"
          className={`${
            activeSection === "contact" ? "text-green-400 font-semibold" : ""
          } hover:text-green-500 transition`}
        >
          Contact
        </a>
        <Link
          to="/login"
          className="border-[2px] px-4 py-1.5 bg-green-100 rounded-lg border-green-600 text-green-700 hover:bg-green-200 transition"
        >
          Sign in
        </Link>
      </ul>

      <div className="md:hidden">
        {/* Mobile menu icon or drawer  */}
      </div>
    </nav>
  );
};

export default Navbar;
