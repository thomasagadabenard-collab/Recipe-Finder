export function saveFavorite(recipe) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const exists = favorites.some(fav => fav.idMeal === recipe.idMeal);
  if (exists) return;

  favorites.push(recipe);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
