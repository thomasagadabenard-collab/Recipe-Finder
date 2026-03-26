import { saveFavorite } from "./favorites.js";

/* ELEMENTS */
const status = document.getElementById("status-message");
const searchBtn = document.querySelector(".search");
const rotate = document.querySelector(".rotate");
const searchInput = document.getElementById("search-input");

/* SEARCH */
searchBtn.addEventListener("click", () => {
  const value = searchInput.value.trim();
  if (!value) return;
  
});


export function renderRecipes(recipes, container) {
  container.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="image-container">
        <img 
          src="${recipe.strMealThumb}" 
          alt="${recipe.strMeal}" 
          class="card-image"
        >
      </div>
      <h3 class="card-title">${recipe.strMeal}</h3>
      <button class="fav-btn">Save</button>
    `;

    card.addEventListener("click", () => {
      if (document.querySelector(".modal")) return;

      const modal = document.createElement("div");
      modal.className = "modal";

      const instructionsList = recipe.strInstructions
        .split(/[\r\n]+|\.\s+/)
        .filter(step => step.trim() !== "")
        .map(step => `<li>${step.trim()}</li>`)
        .join("");

      modal.innerHTML = `
        <div class="modal-content">
          <span id="close-modal">&times;</span>
          <h3>${recipe.strMeal}</h3>
          <img 
            src="${recipe.strMealThumb}" 
            alt="${recipe.strMeal}" 
            class="modal-image"
          >
          <ol class = "ordered-list">
            ${instructionsList}    
          </ol>
        </div>
      `;

      document.body.appendChild(modal);

      const closeBtn = modal.querySelector("#close-modal");

      closeBtn.addEventListener("click", () => modal.remove());

      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.remove();
      });
    });

    /* FAVORITE */
    const favBtn = card.querySelector(".fav-btn");

    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      saveFavorite(recipe);
      favBtn.textContent = "Saved";
    });

    container.appendChild(card);
  });
}

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