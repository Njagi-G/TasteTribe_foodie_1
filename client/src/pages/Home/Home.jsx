import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <section
      className="bg-cover bg-center font-urbanist min-h-screen relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522546889731-cbdb0fae9557?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-white max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
          >
            IGNITE CULINARY MAGIC
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Discover a world of flavours, create your own recipes, and let your
            home be filled with the aroma of culinary passion
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link
              to="/login"
              className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-8 rounded-full w-full sm:w-auto text-center transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl font-bold text-lg border-2 border-white animate-pulse"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-8 rounded-full w-full sm:w-auto text-center transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl font-bold text-lg border-2 border-white animate-pulse"
            >
              Sign Up
            </Link>
            <Link
              to="/recipes"
              className="bg-gradient-to-r from-purple-400 to-pink-600 text-white py-3 px-8 rounded-full w-full sm:w-auto text-center transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl font-bold text-lg border-2 border-white animate-pulse"
            >
              Discover Recipes
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"
      />
    </section>
  );
};

export default Home;
