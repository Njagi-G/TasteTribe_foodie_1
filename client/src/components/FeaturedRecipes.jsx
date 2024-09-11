import React, { useEffect, useState } from "react";
import api from "../api";
import FeaturedRecipesCard from "../components/FeaturedRecipesCard";

const FeaturedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardsPerPage, setCardsPerPage] = useState(2);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get("/api/recipes", {
          params: { dietType: "Dessert" },
        });
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + 1) % Math.ceil(recipes.length / cardsPerPage)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [recipes, cardsPerPage]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error)
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 min-h-screen p-4 sm:p-8 font-urbanist">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-green-800 tracking-wide">
        Featured Recipes
      </h1>

      <div className="pb-20 relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg shadow-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {Array.from(
            { length: Math.ceil(recipes.length / cardsPerPage) },
            (_, i) => i * cardsPerPage
          ).map((startIndex) => (
            <div
              key={startIndex}
              className="w-full flex-shrink-0 flex flex-col sm:flex-row gap-4"
            >
              {recipes
                .slice(startIndex, startIndex + cardsPerPage)
                .map((recipe) => (
                  <div
                    key={recipe.id}
                    className={`w-full ${
                      cardsPerPage === 1
                        ? ""
                        : cardsPerPage === 2
                        ? "sm:w-1/2"
                        : "sm:w-1/2 lg:w-1/3"
                    } px-2 mb-4 sm:mb-0`}
                  >
                    <FeaturedRecipesCard recipe={recipe} />
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {Array.from(
            { length: Math.ceil(recipes.length / cardsPerPage) },
            (_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-green-600" : "bg-green-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRecipes;
