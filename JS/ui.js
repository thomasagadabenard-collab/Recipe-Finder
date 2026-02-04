import { saveFavorite } from "./favorites.js";

const status = document.getElementById("status-message");

export function renderRecipes(recipes, container) {
  container.innerHTML = "";

  recipes.forEach(recipe => {
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
      <button class="fav-btn"> Save</button>
    `;

    card.addEventListener("click", () => {
    
    if (card.querySelector(".instructions")) return;

    let para = document.createElement("p");
    para.className = "instructions";  
    para.innerText = recipe.strInstructions;

    card.appendChild(para);
});


    
    card.querySelector(".fav-btn").addEventListener("click", (e) => {
      e.stopPropagation(); 
      saveFavorite(recipe);
      e.target.textContent = " Saved";
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
