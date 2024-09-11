import React, { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api";
import UserRecipesCard from "../../components/UserRecipesCard";

// Initial state for a new recipe
const initialRecipeState = {
  chefImage: "",
  title: "",
  chefName: "",
  image: "",
  ingredients: "",
  instructions: "",
  url: "",
  moreInfoUrl: "",
  rating: 0,
  prepTime: "",
  servings: 0,
  countryOfOrigin: "",
  dietType: "",
};

const UserRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState(initialRecipeState);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async () => {
    try {
      const [userRecipes, bookmarked] = await Promise.all([
        api.get("/api/recipes/user?limit=20"),
        api.get("/api/recipes/bookmarked?limit=20"),
      ]);
      setRecipes(userRecipes.data);
      setBookmarkedRecipes(bookmarked.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("Failed to fetch recipes. Please try again later.");
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submittedRecipe = {
      ...newRecipe,
      rating: parseFloat(newRecipe.rating) || 0,
      ingredients:
        typeof newRecipe.ingredients === "string"
          ? newRecipe.ingredients
          : newRecipe.ingredients.join(""),
      instructions:
        typeof newRecipe.instructions === "string"
          ? newRecipe.instructions
          : newRecipe.instructions.join(""),
    };

    try {
      if (editingRecipe) {
        // Check if any changes were made
        const hasChanges = Object.keys(submittedRecipe).some(
          (key) => submittedRecipe[key] !== editingRecipe[key]
        );

        if (!hasChanges) {
          toast.info("No changes were made to the recipe.");
          setShowForm(false);
          setEditingRecipe(null);
          return;
        }

        const { data } = await api.put(
          `/api/recipes/${editingRecipe.id}`,
          submittedRecipe
        );
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === editingRecipe.id ? data : recipe
          )
        );
        toast.success(`Recipe "${data.title}" updated successfully!`);
      } else {
        const { data } = await api.post("/api/recipes", submittedRecipe);
        setRecipes((prevRecipes) => [...prevRecipes, data]);
        toast.success(`New recipe "${data.title}" created successfully!`);
      }
      setNewRecipe(initialRecipeState);
      setShowForm(false);
      setEditingRecipe(null);
      setError(null);
    } catch (error) {
      console.error("Error submitting recipe:", error);
      setError("Failed to save the recipe. Please try again.");
      toast.error("Failed to save the recipe. Please try again.");
    }
  };

  const handleEdit = useCallback((recipe) => {
    setEditingRecipe(recipe);
    setNewRecipe({
      ...recipe,
      ingredients:
        typeof recipe.ingredients === "string"
          ? recipe.ingredients
          : recipe.ingredients.join(""),
      instructions:
        typeof recipe.instructions === "string"
          ? recipe.instructions
          : recipe.instructions.join(""),
    });
    setShowForm(true);
  }, []);

  const handleDelete = useCallback(async (id, title) => {
    try {
      await api.delete(`/api/recipes/${id}`);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
      toast.success(`Recipe "${title}" deleted successfully!`);
      setError(null);
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setError("Failed to delete the recipe. Please try again.");
      toast.error("Failed to delete the recipe. Please try again.");
    }
  }, []);

  const handleRemoveBookmark = useCallback(async (id, title) => {
    try {
      await api.delete(`/api/recipes/${id}/bookmark`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setBookmarkedRecipes((prevBookmarks) =>
        prevBookmarks.filter((recipe) => recipe.id !== id)
      );
      toast.success(`Bookmark for "${title}" removed successfully!`);
      setError(null);
    } catch (error) {
      console.error("Error removing bookmark:", error);
      setError("Failed to remove the bookmark. Please try again.");
      toast.error("Failed to remove the bookmark. Please try again.");
    }
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setShowForm(false);
        setEditingRecipe(null);
      }
    };
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const renderRecipeForm = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50"
      id="recipe-modal"
    >
      <div className="relative top-20 mx-auto p-4 md:p-8 border w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-lg bg-white max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#33665A] text-center tracking-wide">
          {editingRecipe
            ? "Edit Your Recipe"
            : "Create a New Culinary Masterpiece"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {[
            {
              label: "Recipe Title",
              name: "title",
              type: "text",
              placeholder: "Enter your recipe title",
            },
            {
              label: "Chef Name",
              name: "chefName",
              type: "text",
              placeholder: "Your name or pseudonym",
            },
            {
              label: "Recipe Image URL",
              name: "image",
              type: "url",
              placeholder: "https://example.com/your-delicious-dish.jpg",
            },
            {
              label: "Chef Image URL",
              name: "chefImage",
              type: "url",
              placeholder: "https://example.com/chef-portrait.jpg",
            },
            {
              label: "Ingredients",
              name: "ingredients",
              type: "textarea",
              placeholder: "List your ingredients, one per line",
              rows: 4,
            },
            {
              label: "Cooking Instructions",
              name: "instructions",
              type: "textarea",
              placeholder: "Describe your cooking process step by step",
              rows: 4,
            },
            {
              label: "Recipe URL",
              name: "url",
              type: "url",
              placeholder: "https://your-recipe-blog.com/this-recipe",
            },
            {
              label: "More Info URL",
              name: "moreInfoUrl",
              type: "url",
              placeholder: "https://cooking-tips.com/related-info",
            },
            {
              label: "Rating",
              name: "rating",
              type: "number",
              placeholder: "Rate your recipe (0-5)",
              min: 0,
              max: 5,
              step: 0.1,
            },
            {
              label: "Preparation Time",
              name: "prepTime",
              type: "text",
              placeholder: "e.g., 30 minutes, 1 hour",
            },
            {
              label: "Servings",
              name: "servings",
              type: "number",
              placeholder: "Number of servings",
              min: 1,
            },
            {
              label: "Country of Origin",
              name: "countryOfOrigin",
              type: "text",
              placeholder: "Where is this dish from?",
            },
            {
              label: "Diet Type",
              name: "dietType",
              type: "text",
              placeholder: "e.g., Vegetarian, Vegan, Keto, Paleo",
            },
          ].map((field) => (
            <div key={field.name} className="mb-4">
              <label
                className="block text-[#33665A] text-sm font-bold mb-2"
                htmlFor={field.name}
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  className="shadow-sm focus:ring-[#33665A] focus:border-[#33665A] block w-full sm:text-sm border-gray-300 rounded-md p-3 transition duration-300 ease-in-out"
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={newRecipe[field.name]}
                  onChange={handleInputChange}
                  required
                  rows={field.rows}
                />
              ) : (
                <input
                  className="shadow-sm focus:ring-[#33665A] focus:border-[#33665A] block w-full sm:text-sm border-gray-300 rounded-md p-3 transition duration-300 ease-in-out"
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={newRecipe[field.name]}
                  onChange={handleInputChange}
                  required
                  {...(field.type === "number" && {
                    min: field.min,
                    max: field.max,
                    step: field.step,
                  })}
                />
              )}
            </div>
          ))}
          <div className="flex flex-col md:flex-row justify-end space-y-4 md:space-y-0 md:space-x-4 mt-8">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingRecipe(null);
              }}
              className="bg-green-900 hover:bg-green-950 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#33665A] hover:bg-[#264c42] text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33665A] focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {editingRecipe ? "Update Recipe" : "Create Recipe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 font-urbanist">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-[#33665A] text-center tracking-wide">
          Your Culinary Creations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="flex flex-col">
              <div className="relative transform transition duration-300 hover:scale-105">
                <UserRecipesCard recipe={recipe} />
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={() => handleEdit(recipe)}
                  className="bg-green-900 hover:bg-green-950 text-white font-bold p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300 ease-in-out group relative"
                  aria-label="Edit recipe"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path
                      fillRule="evenodd"
                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    Edit Recipe
                  </span>
                </button>
                <button
                  onClick={() => handleDelete(recipe.id, recipe.title)}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition duration-300 ease-in-out group relative"
                  aria-label="Delete recipe"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    Delete Recipe
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold mt-12 mb-8 text-[#33665A] text-center tracking-wide">
          Bookmarked Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {bookmarkedRecipes.map((recipe) => (
            <div key={recipe.id} className="flex flex-col">
              <div className="relative transform transition duration-300 hover:scale-105">
                <UserRecipesCard recipe={recipe} />
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => handleRemoveBookmark(recipe.id, recipe.title)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition duration-300 ease-in-out group relative"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="absolute invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-1/2 transform -translate-x-1/2">
                    Remove Bookmark
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setEditingRecipe(null);
            setNewRecipe(initialRecipeState);
            setShowForm(true);
          }}
          className="fixed bottom-8 right-8 bg-[#33665A] hover:bg-[#264c42] text-white font-bold w-16 h-16 rounded-full focus:outline-none focus:ring-2 focus:ring-[#33665A] focus:ring-opacity-50 flex items-center justify-center group transition-all duration-300 transform hover:scale-110 shadow-lg"
          style={{ position: "fixed" }}
          title="Add Recipe"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-10 left-1/2 transform -translate-x-1/2">
            Add Recipe
          </span>
        </button>
        {showForm && renderRecipeForm()}
      </div>
    </div>
  );
};

export default UserRecipes;
