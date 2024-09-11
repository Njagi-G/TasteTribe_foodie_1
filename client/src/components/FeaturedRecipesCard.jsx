import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaBookmark,
  FaClock,
  FaComment,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import api from "../api";

const FeaturedRecipesCard = ({ recipe }) => {
  const [liked, setLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        const response = await api.get(`/api/recipes/${recipe.id}/bookmark`);
        setIsBookmarked(response.data.bookmarked);
      } catch (error) {
        console.error("Error fetching bookmark status:", error);
      }
    };
    fetchBookmarkStatus();
  }, [recipe.id]);

  const toggleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
    toast.success(liked ? "Recipe unliked!" : "Recipe liked!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toggleBookmark = async (e) => {
    e.preventDefault();
    try {
      if (isBookmarked) {
        await api.delete(`/api/recipes/${recipe.id}/bookmark`);
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
        await api.post(`/api/recipes/${recipe.id}/bookmark`);
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
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
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
  };

  const handleCommentClick = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  const handleShare = (platform) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          recipe.url
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          recipe.url
        )}&text=${encodeURIComponent(recipe.title)}`;
        break;
      case "instagram":
        shareUrl = "https://www.instagram.com/";
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(
          `Check out this recipe: ${recipe.title} ${recipe.url}`
        )}`;
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
      toast.info(`Shared on ${platform}!`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-yellow-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <FaStar className="text-gray-300" />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: "50%" }}
            >
              <FaStar className="text-yellow-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FaStar key={`empty-${i}`} className="text-gray-300" />
        ))}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col h-full w-full relative transition-all duration-300 ease-in-out hover:shadow-3xl hover:scale-105 border-2 border-green-300 hover:border-green-400"
    >
      <div className="flex items-center space-x-4 mb-4">
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={recipe.chefImage}
          alt="Chef"
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-green-400 shadow-lg"
        />
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-green-800 truncate">
            {recipe.title}
          </h1>
          <p className="text-xs sm:text-sm text-green-600 truncate">
            by <span className="font-semibold">{recipe.chefName}</span>
          </p>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="mb-4 relative overflow-hidden rounded-2xl"
      >
        <img
          src={recipe.image}
          alt="Recipe"
          className="w-full h-48 sm:h-56 md:h-64 object-cover shadow-xl transition-transform duration-300 ease-in-out hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs sm:text-sm font-semibold text-green-700 shadow-md">
          <FaClock className="inline mr-1" /> {recipe.prepTime}
        </div>
      </motion.div>

      <div className="mb-4 text-xs sm:text-sm text-gray-700 space-y-2 flex-grow overflow-y-auto max-h-32 sm:max-h-40 md:max-h-48 pr-2 custom-scrollbar">
        <p className="flex justify-between">
          <span className="font-semibold text-green-700">Diet Type:</span>{" "}
          {recipe.dietType}
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-green-700">Servings:</span>{" "}
          {recipe.servings}
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-green-700">
            Country of Origin:
          </span>{" "}
          {recipe.countryOfOrigin}
        </p>
        <p>
          <span className="font-semibold text-green-700">Ingredients:</span>{" "}
          {recipe.ingredients}
        </p>
        <p>
          <span className="font-semibold text-green-700">Instructions:</span>{" "}
          {recipe.instructions}
        </p>
      </div>

      <Link
        to={`/recipes/${recipe.id}`}
        className="text-green-600 hover:text-green-700 text-xs sm:text-sm block mb-3 underline font-semibold transition-colors duration-200"
      >
        See More Recipe Details
      </Link>

      <div className="flex items-center justify-between mb-4 bg-green-100 p-2 sm:p-3 rounded-xl text-xs sm:text-sm shadow-inner">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleLike}
          className={`flex items-center space-x-1 ${
            liked ? "text-red-500" : "text-gray-600"
          } hover:text-red-600 transition-colors duration-200`}
        >
          <FaHeart className="text-lg" />
          <span className="hidden sm:inline">{liked ? "Liked" : "Like"}</span>
        </motion.button>
        <div className="flex items-center space-x-1">
          <div className="flex">{renderStars(recipe.rating)}</div>
          <span className="font-semibold">{recipe.rating.toFixed(1)}</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleBookmark}
          className={`${
            isBookmarked ? "text-blue-500" : "text-gray-600"
          } group relative hover:text-blue-600 transition-colors duration-200`}
        >
          <FaBookmark className="text-lg" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCommentClick}
          className="text-gray-600 hover:text-green-600 transition-colors duration-200 group relative"
        >
          <FaComment className="text-lg" />
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Comment
          </span>
        </motion.button>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleShare("facebook")}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <FaFacebookF className="text-xl" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleShare("twitter")}
          className="text-black hover:text-gray-700 transition-colors duration-200"
        >
          <FaXTwitter className="text-xl" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleShare("instagram")}
          className="text-pink-600 hover:text-pink-800 transition-colors duration-200"
        >
          <FaInstagram className="text-xl" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleShare("whatsapp")}
          className="text-green-600 hover:text-green-800 transition-colors duration-200"
        >
          <FaWhatsapp className="text-xl" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FeaturedRecipesCard;
