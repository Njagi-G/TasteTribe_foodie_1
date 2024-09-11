import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

import { FaXTwitter } from "react-icons/fa6";
import {
  FaSearch,
  FaBookmark,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaStar,
  FaClock,
  FaUtensils,
  FaGlobeAmericas,
  FaFilter,
  FaExclamationCircle,
} from "react-icons/fa";

const dietTypes = [
  "All",
  "Vegan",
  "Dash",
  "Keto",
  "Atkins",
  "Pescatarian",
  "Gluten-Free",
];

const extractMinutes = (prepTime) => {
  const hourMatch = prepTime.match(/(\d+)\s*hour/);
  const minuteMatch = prepTime.match(/(\d+)\s*min/);

  let totalMinutes = 0;
  if (hourMatch) totalMinutes += parseInt(hourMatch[1]) * 60;
  if (minuteMatch) totalMinutes += parseInt(minuteMatch[1]);

  return totalMinutes;
};

const ExploreRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedDietType, setSelectedDietType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [servingsFilter, setServingsFilter] = useState("");
  const [prepTimeFilter, setPrepTimeFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/recipes");
      setRecipes(response.data);
      const bookmarkStatuses = {};
      const bookmarkPromises = response.data.map(async (recipe) => {
        try {
          const bookmarkResponse = await api.get(
            `/api/recipes/${recipe.id}/bookmark`
          );
          bookmarkStatuses[recipe.id] = bookmarkResponse.data.bookmarked;
        } catch (bookmarkError) {
          if (bookmarkError.response && bookmarkError.response.status === 401) {
            console.log("User not authenticated for bookmarks");
            bookmarkStatuses[recipe.id] = false;
          } else {
            console.error("Error fetching bookmark status:", bookmarkError);
          }
        }
      });
      await Promise.all(bookmarkPromises);
      setBookmarkedRecipes(bookmarkStatuses);
      setError(null);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      if (error.response && error.response.status === 401) {
        setError("Unauthorized. Please log in.");
        navigate("/login");
      } else {
        setError("An error occurred while fetching recipes.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const searchLower = searchTerm.toLowerCase();
      const searchFields = [
        recipe.title,
        recipe.chefName,
        recipe.countryOfOrigin,
        recipe.dietType,
        ...(Array.isArray(recipe.ingredients)
          ? recipe.ingredients
          : [recipe.ingredients]),
        recipe.instructions,
      ];
      const matchesSearch = searchFields.some(
        (field) =>
          field &&
          typeof field === "string" &&
          field.toLowerCase().includes(searchLower)
      );
      const prepTimeMinutes = extractMinutes(recipe.prepTime);
      const servingsFilterNumber = parseInt(servingsFilter) || 0;
      const prepTimeFilterNumber = parseInt(prepTimeFilter) || 0;

      return (
        matchesSearch &&
        (selectedDietType === "All" || recipe.dietType === selectedDietType) &&
        (selectedCountry === "All" ||
          recipe.countryOfOrigin === selectedCountry) &&
        (ratingFilter === 0 || recipe.rating >= ratingFilter) &&
        (servingsFilterNumber === 0 ||
          recipe.servings >= servingsFilterNumber) &&
        (prepTimeFilterNumber === 0 || prepTimeMinutes <= prepTimeFilterNumber)
      );
    });
  }, [
    recipes,
    searchTerm,
    selectedDietType,
    selectedCountry,
    ratingFilter,
    servingsFilter,
    prepTimeFilter,
  ]);

  const countries = useMemo(
    () => ["All", ...new Set(recipes.map((recipe) => recipe.countryOfOrigin))],
    [recipes]
  );

  const shareOnSocialMedia = useCallback((platform, recipe) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this ${recipe.title} recipe!`);
    let shareUrl;

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case "instagram":
        shareUrl = `https://www.instagram.com/`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${text} ${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank");
    toast.success(`Shared on ${platform}!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);

  const toggleBookmark = useCallback(
    async (recipeId) => {
      try {
        if (bookmarkedRecipes[recipeId]) {
          await api.delete(`/api/recipes/${recipeId}/bookmark`);
          setBookmarkedRecipes((prev) => ({
            ...prev,
            [recipeId]: false,
          }));
          toast.info("Recipe removed from bookmarks!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          await api.post(`/api/recipes/${recipeId}/bookmark`);
          setBookmarkedRecipes((prev) => ({
            ...prev,
            [recipeId]: true,
          }));
          toast.success("Recipe bookmarked!", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (error) {
        console.error("Error toggling bookmark:", error);
        if (error.response && error.response.status === 401) {
          toast.error("Please log in to bookmark recipes.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/login");
        } else {
          toast.error("Failed to update bookmark. Please try again.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    },
    [bookmarkedRecipes, navigate]
  );

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center h-screen text-2xl font-semibold text-green-600"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600 mr-4"></div>
        Loading...
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col justify-center items-center h-screen text-2xl font-semibold text-red-600"
      >
        <FaExclamationCircle className="text-5xl mb-4" />
        {error}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen p-8 font-urbanist"
    >
      <ToastContainer />
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold text-center mb-12 text-green-800 tracking-wide"
      >
        Explore Culinary Delights
      </motion.h1>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {dietTypes.map((type, index) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`px-6 py-3 ${
              selectedDietType === type
                ? "bg-green-600 text-white"
                : "bg-white text-green-600"
            } rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-semibold text-lg`}
            onClick={() => setSelectedDietType(type)}
          >
            {type}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
      >
        <div className="relative w-full md:w-2/3 lg:w-1/2">
          <input
            type="text"
            placeholder="Search recipes, chefs, ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 pl-12 pr-10 text-green-600 bg-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-lg"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 text-xl" />
        </div>
        <div className="flex items-center w-full md:w-auto">
          <label
            htmlFor="country-select"
            className="mr-4 text-green-700 font-semibold text-lg"
          >
            <FaGlobeAmericas className="inline-block mr-2" />
            Select Country:
          </label>
          <select
            id="country-select"
            className="px-6 py-3 bg-white text-green-600 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 cursor-pointer text-lg"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-green-600 text-white rounded-full shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-semibold text-lg"
        >
          <FaFilter className="mr-2" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-green-700 font-semibold mb-2">
                Minimum Rating
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(parseFloat(e.target.value))}
                className="w-full"
              />
              <span>{ratingFilter} stars</span>
            </div>
            <div>
              <label className="block text-green-700 font-semibold mb-2">
                Minimum Servings
              </label>
              <input
                type="number"
                min="0"
                value={servingsFilter}
                onChange={(e) => setServingsFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-green-700 font-semibold mb-2">
                Maximum Prep Time (minutes)
              </label>
              <input
                type="number"
                min="0"
                value={prepTimeFilter}
                onChange={(e) => setPrepTimeFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-full transform transition duration-300 hover:scale-105"
            >
              <div className="relative h-64">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-2 rounded-bl-2xl font-semibold">
                  {recipe.dietType}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-bold text-green-800 truncate">
                      {recipe.title}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleBookmark(recipe.id)}
                      className={`${
                        bookmarkedRecipes[recipe.id]
                          ? "text-blue-500"
                          : "text-gray-400"
                      } group relative hover:text-blue-600 transition-colors duration-200`}
                    >
                      <FaBookmark className="text-3xl" />
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {bookmarkedRecipes[recipe.id]
                          ? "Bookmarked"
                          : "Bookmark"}
                      </span>
                    </motion.button>
                  </div>
                  <div className="flex items-center mb-4">
                    <img
                      src={recipe.chefImage}
                      alt={recipe.chefName}
                      className="w-12 h-12 rounded-full mr-3 border-2 border-green-500"
                    />
                    <span className="text-gray-700 font-medium truncate">
                      {recipe.chefName}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <FaClock className="mr-1 text-green-500" />{" "}
                      {recipe.prepTime}
                    </span>
                    <span className="flex items-center">
                      <FaUtensils className="mr-1 text-green-500" /> Servings:{" "}
                      {recipe.servings}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-500 font-bold text-lg flex items-center">
                      <FaStar className="mr-1" /> {recipe.rating.toFixed(1)}
                    </span>
                    <span className="text-green-600 font-semibold flex items-center">
                      <FaGlobeAmericas className="mr-1" />{" "}
                      {recipe.countryOfOrigin}
                    </span>
                  </div>
                </div>
                <div>
                  <Link
                    to={`/recipes/${recipe.id}`}
                    className="mt-6 block w-full text-center bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-lg"
                  >
                    View Recipe
                  </Link>

                  <div className="mt-4 flex justify-center space-x-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => shareOnSocialMedia("facebook", recipe)}
                      className="text-blue-600 cursor-pointer text-3xl hover:text-blue-800 transition-colors duration-300"
                    >
                      <FaFacebookF />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => shareOnSocialMedia("twitter", recipe)}
                      className="text-black cursor-pointer text-3xl hover:text-blue-600 transition-colors duration-300"
                    >
                      <FaXTwitter />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => shareOnSocialMedia("instagram", recipe)}
                      className="text-pink-600 cursor-pointer text-3xl hover:text-pink-800 transition-colors duration-300"
                    >
                      <FaInstagram />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => shareOnSocialMedia("whatsapp", recipe)}
                      className="text-green-500 cursor-pointer text-3xl hover:text-green-700 transition-colors duration-300"
                    >
                      <FaWhatsapp />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      {filteredRecipes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-2xl font-semibold text-gray-600">
            No recipes found.
          </p>
          <p className="text-lg text-gray-500 mt-2">
            Try adjusting your search or filters.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ExploreRecipes;
