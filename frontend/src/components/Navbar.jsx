import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="h-16 flex justify-between items-center px-4 md:px-16">
      <div className="flex items-center gap-5 font-emblema">
        <img src="/images/massmoney.png" alt="" className="h-12 w-12" />
        <h2 className="text-2xl cursor-pointer">MassMoney</h2>
      </div>

      <ul className="hidden md:flex gap-8 lg:gap-16 items-center font-rubik">
        <a className="underline text-green-400">Home</a>
        <a>About</a>
        <a>Demo</a>
        <a>Contact</a>
        <Link
          to={"login"}
          className="border-[2px] px-4 bg-green-100 rounded-lg border-green-600 text-green-700"
        >
          Sign in
        </Link>
      </ul>
      <div className="md:hidden">
        {/* Add mobile menu icon here if needed */}
      </div>
    </nav>
  );
};

export default Navbar;