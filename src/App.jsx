import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [cocktailDb, setCocktailDb] = useState([]);

  const fetchCocktail = async () => {
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php?key=1"
      );
      const data = await response.json();
      setCocktailDb(data.drinks);
      console.log(cocktailDb);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderIngredients = () => {
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktailDb[0][`strIngredient${i}`];
      const measurement = cocktailDb[0][`strMeasure${i}`];

      if (ingredient && measurement) {
        ingredients.push(
          <li key={i}>
            {measurement} {ingredient}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Welcome to Cocktail Database by Dhanush</h1>
      <h2 className="app-subtitle">
        Click the generate button below to generate a random Cocktail
      </h2>
      <button className="app-button" onClick={fetchCocktail}>
        Generate
      </button>
      {cocktailDb &&
        cocktailDb.map((cocktail, index) => (
          <div key={index} className="cocktail-container">
            <h1 className="cocktail-name">
              Cocktail name: {cocktail.strDrink}
            </h1>
            <div className="alcoholic-type">
              {cocktail.strAlcoholic === "Alcoholic" ? (
                <h2>Alcoholic</h2>
              ) : (
                <h2>Non Alcoholic</h2>
              )}
            </div>
            <img
              className="cocktail-image"
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
            />
            <h2 className="ingredients-title">Ingredients:</h2>
            <ul className="ingredients-list">{renderIngredients()}</ul>
            <h2 className="instructions-title">
              Instructions:{" "}
              {cocktail.strInstructions ? (
                <span>{cocktail.strInstructions}</span>
              ) : (
                <span>No instructions available</span>
              )}
            </h2>
            <h2 className="youtubeLink-title">
              Youtube Video Link:{" "}
              {cocktail.strVideo ? (
                <a href={cocktail.strVideo} target="__blank">Click!</a>
              ) : (
                <span>No videos available</span>
              )}
            </h2>
          </div>
        ))}
    </div>
  );
};

export default App;
