export default function save() {

    const LOCAL_STORAGE_Recipe_KEY = 'ingredient.Recipes';
    const LOCAL_STORAGE_SELECTED_Recipe_ID_KEY = 'ingredient.selectedRecipeId';
    let Recipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_Recipe_KEY)) || [];
    let selectedRecipeId = localStorage.getItem(LOCAL_STORAGE_SELECTED_Recipe_ID_KEY);

    // localStorage.clear()


    localStorage.setItem(LOCAL_STORAGE_Recipe_KEY, JSON.stringify(Recipes));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_Recipe_ID_KEY, selectedRecipeId);
    console.log(localStorage)
  }
