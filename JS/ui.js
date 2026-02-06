import { saveFavorite } from "./favorites.js";

const status = document.getElementById("status-message");

const search = document.querySelector(".search");

const rotate = document.querySelector(".rotate")

const searchInput = document.getElementById("search-input");


search.addEventListener("click", () => {

  let see = searchInput.value.trim();
  if(!see)return
  else{
    rotate.classList.add("active");
  }
});


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
      
      if (document.querySelector(".modal")) return;

      const modal = document.createElement("div");
      modal.className = "modal";

      modal.innerHTML = `
        <div class="modal-content">
          <span id="close-modal">&times;</span>
          <h3>${recipe.strMeal}</h3>
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="modal-image">
          <p>${recipe.strInstructions}</p>
        </div>
      `;

      document.body.appendChild(modal);

      modal.querySelector("#close-modal").addEventListener("click", () => {
        modal.remove();
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.remove();
      });
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
