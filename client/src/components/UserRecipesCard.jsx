import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const UserRecipesCard = ({ recipe, shareOnSocialMedia }) => {
  const handleShare = (platform) => {
    let shareUrl = "";
    let shareText = encodeURIComponent(recipe.title);

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          document.location.href
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          document.location.href
        )}&text=${shareText}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${shareText} ${encodeURIComponent(
          document.location.href
        )}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      const width = 550;
      const height = 400;
      const left = screen.width / 2 - width / 2;
      const top = screen.height / 2 - height / 2;
      const features = `width=${width},height=${height},top=${top},left=${left}`;
      window.open(shareUrl, "share", features);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col h-full">
      <div className="relative h-48 sm:h-64">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 bg-green-600 text-white px-2 py-1 text-xs sm:text-sm rounded-bl-lg">
          {recipe.dietType}
        </div>
      </div>
      <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-green-800 line-clamp-2 h-14 sm:h-16">
            {recipe.title}
          </h3>
          <div className="flex items-center mb-4">
            <img
              src={recipe.chefImage}
              alt={recipe.chefName}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3"
            />
            <span className="text-sm sm:text-base text-gray-600 truncate">
              {recipe.chefName}
            </span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-4">
            <span>Prep: {recipe.prepTime}</span>
            <span>Servings: {recipe.servings}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-yellow-500">★ {recipe.rating}</span>
            <span className="text-green-600">{recipe.countryOfOrigin}</span>
          </div>
        </div>
        <div>
          <Link
            to={`/recipes/${recipe.id}`}
            className="mt-4 block w-full text-center bg-green-600 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base"
          >
            View Recipe
          </Link>
          <div className="mt-4 flex justify-end space-x-3 sm:space-x-4">
            <FaFacebook
              className="text-blue-600 cursor-pointer text-lg sm:text-xl hover:text-blue-800 transition-colors duration-300"
              onClick={() => handleShare("facebook")}
            />
            <FaXTwitter
              className="text-black cursor-pointer text-lg sm:text-xl hover:text-gray-700 transition-colors duration-300"
              onClick={() => handleShare("twitter")}
            />
            <FaInstagram
              className="text-pink-600 cursor-pointer text-lg sm:text-xl hover:text-pink-800 transition-colors duration-300"
              onClick={() => handleShare("instagram")}
            />
            <FaWhatsapp
              className="text-green-500 cursor-pointer text-lg sm:text-xl hover:text-green-700 transition-colors duration-300"
              onClick={() => handleShare("whatsapp")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRecipesCard;
