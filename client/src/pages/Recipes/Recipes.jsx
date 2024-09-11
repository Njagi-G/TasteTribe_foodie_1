import React from "react";
import ExploreRecipes from "../../components/ExploreRecipes";
import FeaturedRecipes from "../../components/FeaturedRecipes";

const Recipes = () => {
  return (
    <div>
      <div>
        <FeaturedRecipes />
      </div>
      <div>
        <ExploreRecipes />
      </div>
    </div>
  );
};

export default Recipes;
