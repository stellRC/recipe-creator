export default function renderIngredientCount(selectedRecipe) {
    const RecipeCountElement = document.querySelector('[data-ingredient-count]');
    const incompleteIngredientCount = selectedRecipe.ingredients.filter(ingredient => !ingredient.complete).length;
    const ingredientString = incompleteIngredientCount === 1 ? "ingredient" : "ingredients";
    RecipeCountElement.innerText = `${incompleteIngredientCount} ${ingredientString}`;
  }