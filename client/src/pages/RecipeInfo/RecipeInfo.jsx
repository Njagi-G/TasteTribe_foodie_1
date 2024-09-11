import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import {
  FaClock,
  FaUtensils,
  FaUsers,
  FaStar,
  FaBookmark,
} from "react-icons/fa";

const RecipeInfo = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeAndBookmarkStatus = async () => {
      try {
        setIsLoading(true);
        const [recipeResponse, bookmarkResponse] = await Promise.all([
          api.get(`/api/recipes/${recipeId}`),
          api.get(`/api/recipes/${recipeId}/bookmark`),
        ]);
        setRecipe(recipeResponse.data);
        setComments(recipeResponse.data.comments || []);
        setIsBookmarked(bookmarkResponse.data.bookmarked);
      } catch (error) {
        console.error("Error fetching recipe or bookmark status:", error);
        toast.error("Failed to load recipe. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipeAndBookmarkStatus();
  }, [recipeId]);

  const handleRating = async (newRating) => {
    try {
      await api.put(`/api/recipes/${recipeId}`, { rating: newRating });
      setRating(newRating);
      toast.success("Rating updated successfully!");
    } catch (error) {
      console.error("Error rating recipe:", error);
      toast.error("Failed to update rating. Please try again.");
    }
  };

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await api.delete(`/api/recipes/${recipeId}/bookmark`);
        toast.success("Recipe removed from bookmarks!");
      } else {
        await api.post(`/api/recipes/${recipeId}/bookmark`);
        toast.success("Recipe added to bookmarks!");
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      toast.error("Failed to update bookmark. Please try again.");
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        const response = await api.post(`/api/recipes/${recipeId}/comment`, {
          content: comment,
        });
        setComments([...comments, response.data]);
        setComment("");
        toast.success("Comment added successfully!");
      } catch (error) {
        console.error("Error submitting comment:", error);
        toast.error("Failed to add comment. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full"
        />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="text-center text-2xl text-red-500 mt-10">
        Recipe not found
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-100 to-green-100 min-h-screen py-12"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-2/3 p-8"
          >
            <div className="text-center mb-8">
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={recipe.chefImage}
                alt={recipe.chefName}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-lg object-cover"
              />
              <h1 className="text-4xl font-bold text-gray-800 mb-2 font-serif">
                {recipe.title}
              </h1>
              <p className="text-xl text-gray-600 italic font-light">
                by {recipe.chefName}
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-8 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-80 object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="flex justify-around text-sm text-gray-600 mb-8 bg-gray-100 py-6 rounded-lg shadow-inner"
            >
              <div className="flex flex-col items-center">
                <FaClock className="text-2xl mb-2 text-blue-500" />
                <span className="font-semibold">{recipe.prepTime}</span>
              </div>
              <div className="flex flex-col items-center">
                <FaUtensils className="text-2xl mb-2 text-green-500" />
                <span className="font-semibold">{recipe.dietType}</span>
              </div>
              <div className="flex flex-col items-center">
                <FaUsers className="text-2xl mb-2 text-purple-500" />
                <span className="font-semibold">{recipe.servings} Serves</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-300 pb-2">
                Ingredients
              </h2>
              <p className="text-gray-600 text-lg whitespace-pre-line">
                {recipe.ingredients}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-green-300 pb-2">
                Instructions
              </h2>
              <p className="text-gray-600 text-lg whitespace-pre-line">
                {recipe.instructions}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-8 bg-gray-50 p-6 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Country of Origin
              </h2>
              <p className="text-xl text-gray-600 italic">
                {recipe.countryOfOrigin || "Not specified"}
              </p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Rating
              </h2>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-yellow-500 mr-2">
                  {recipe.rating.toFixed(1)}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-2xl ${
                        star <= Math.floor(recipe.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/3 bg-gray-50 p-8 border-l border-gray-200"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center">
                <span className="text-2xl font-semibold text-gray-700 mr-2">
                  Rate:
                </span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaStar
                      className={`cursor-pointer text-2xl transition-colors duration-200 ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      } hover:text-yellow-300`}
                      onClick={() => handleRating(star)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${
                isBookmarked ? "bg-blue-600" : "bg-blue-500"
              } text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center justify-center w-full mb-8 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
              onClick={handleBookmark}
            >
              <FaBookmark className="mr-2" />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </motion.button>

            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Comments
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2 custom-scrollbar"
            >
              {comments.map((comment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <p className="text-gray-800 font-semibold mb-1">
                    {comment.author}
                  </p>
                  <p className="text-gray-600">{comment.content}</p>
                </motion.div>
              ))}
            </motion.div>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6"
              onSubmit={handleSubmitComment}
            >
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                rows="4"
                placeholder="Add your comment..."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="mt-3 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all duration-300 w-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              >
                Submit Comment
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </motion.div>
  );
};

export default RecipeInfo;
