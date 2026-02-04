import { saveFavorite } from "./favorites.js";

const status = document.getElementById("status-message");
const modal = document.getElementById("recipe-modal");
const details = document.getElementById("recipe-details");
const closeBtn = document.getElementById("close-modal");

export function renderRecipes(recipes, container) {
  container.innerHTML = "";

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.strMealThumb}" />
      <h3>${recipe.strMeal}</h3>
    `;

    card.addEventListener("click", () => {
      showRecipeDetails(recipe);
    });

    container.appendChild(card);
  });
}

function showRecipeDetails(recipe) {
  modal.classList.remove("hidden");

  details.innerHTML = `
    <h2>${recipe.strMeal}</h2>
    <img src="${recipe.strMealThumb}">
    <p>${recipe.strInstructions}</p>
    <button id="fav-btn">Save to Favorites</button>
  `;

  document.getElementById("fav-btn").addEventListener("click", () => {
    saveFavorite(recipe);
  });
}

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

export function showLoading() {
  status.textContent = "Loading recipes...";
  status.style.color = "black";
}

export function hideLoading() {
  status.textContent = "";
}

export function showError(message) {
  status.textContent = message;
  status.style.color = "red";
}
