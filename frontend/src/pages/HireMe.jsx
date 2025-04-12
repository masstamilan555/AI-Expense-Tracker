import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { motion } from "framer-motion";

const HireMe = () => {
  return (
    <motion.div
      className="p-10 flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Profile*/}
      <img
        src="/images/portfolio image.jpg"      
        alt="Developer"
        className="w-32 h-32 rounded-full shadow-xl object-covert transition-all duration-1000 hover:shadow-2xl  hover:shadow-[#04fffb] hover:scale-105" 
      />

      <h1 className="text-3xl font-bold mt-4">Tamilarasu V</h1>
      <p className="text-gray-600 mt-2">Full‑Stack Web and App Developer</p>
      <p>arasut075@gmail.com</p>

      <p className="text-center text-gray-700 max-w-xl mt-4">
      Aspiring Full Stack Developer || Passionate about building scalable, user-focused web applications and contributing to impactful projects while advancing my skills to drive organizational success.
       <br /> </p><span className="mt-10">Let’s collaborate to turn your ideas into reality!</span>
      

      {/* Links */}
      <div className="flex space-x-6 mt-8">
        <a
          href="https://www.linkedin.com/in/tamilarasu55/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 transition transform hover:scale-110"
        >
          <FaLinkedin size={32} />
        </a>

        <a
          href="https://github.com/masstamilan555"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition transform hover:scale-110"
        >
          <FaGithub size={32} />
        </a>

        <a
          href="mailto:arasut075@gmail.com"
          className="text-gray-600 hover:text-red-600 transition transform hover:scale-110"
        >
          <FaEnvelope size={32} />
        </a>

        <a
          href="https://portfolio-masstamilan.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-green-600 transition transform hover:scale-110"
        >
          <FiGlobe size={32} />
        </a>
      </div>
    </motion.div>
  );
};

export default HireMe;
