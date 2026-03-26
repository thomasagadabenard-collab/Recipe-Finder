import { searchRecipes } from "./api.js";
import { renderRecipes, showLoading, showError, hideLoading } from "./ui.js";

const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const grid = document.getElementById("recipes-grid");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    showError("Please enter a search term");
    return;
  }

  showLoading();

  try {
    const recipes = await searchRecipes(query);

    if (!recipes || recipes.length === 0) {
      showError("No recipes found");
      return;
    }

    renderRecipes(recipes, grid);

    hideLoading();

  } catch (err) {
    console.error("Fetch error:", err);

    showError(err.message || "Something went wrong. Try again.");
  }
});