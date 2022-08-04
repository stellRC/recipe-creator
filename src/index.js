import _ from 'lodash';
import clearElement from './clear.js';
import createIngredient from './ingredient.js';
import createRecipe from './createRecipe.js';
import save from './save.js';
import renderIngredientCount from './renderIngredientCount.js';

const recipeSaver = (() => {
  
  const background = document.querySelector('.header__content');
  const RecipesContainer = document.querySelector('[data-recipes]');
  const newRecipeForm = document.querySelector('[data-new-recipe-form]');
  const newRecipeInput = document.querySelector('[data-new-recipe-input]');
  const deleteRecipeButton = document.querySelector('[data-delete-recipe-button]');
  const RecipeDisplayContainer = document.querySelector('[data-recipe-display-container]');
  const RecipeTitleElement = document.querySelector('[data-recipe-title]');
  
  const ingredientsContainer = document.querySelector('[data-ingredients]');
  const ingredientTemplate = document.getElementById('ingredient-template');
  const newIngredientForm = document.querySelector('[data-new-ingredient-form]');
  const newIngredientInput = document.querySelector('[data-new-ingredient-input]');
  const newIngredientAmount = document.querySelector('[data-new-ingredient-amount]');
  const newIngredientMeasurement = document.querySelector('[data-new-ingredient-measurement]');
  const clearCompleteIngredientsButton = document.querySelector('[data-clear-complete-ingredients-button]');
  
  const LOCAL_STORAGE_Recipe_KEY = 'ingredient.Recipes';
  const LOCAL_STORAGE_SELECTED_Recipe_ID_KEY = 'ingredient.selectedRecipeId';
  let Recipes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_Recipe_KEY)) || [];
  let selectedRecipeId = localStorage.getItem(LOCAL_STORAGE_SELECTED_Recipe_ID_KEY);
  
  
  document.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
  
      if(scrollY !==0 ) {
          background.style.backgroundPosition = `calc(50% + ${scrollY}px) calc(50% + ${scrollY}px)`;
      } else {
          background.style.backgroundPosition = '';
      }
  });
  
  RecipesContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
      selectedRecipeId = e.target.dataset.RecipeId;
      saveAndRender()
      }
  });
  
  ingredientsContainer.addEventListener('click', e => {
      if (e.target.tagName.toLowerCase() === 'input') {
          const selectedRecipe = Recipes.find(Recipe => Recipe.id === selectedRecipeId);
          const selectedIngredient = selectedRecipe.ingredients.find(ingredient => ingredient.id === e.target.id);
  
      selectedIngredient.complete = e.target.checked;
      e.target.previousSibling.previousSibling.classList.toggle('color');
  
      save()
      renderIngredientCount(selectedRecipe)
    }
  });
  
  clearCompleteIngredientsButton.addEventListener('click', () => {
    const selectedRecipe = Recipes.find(Recipe => Recipe.id === selectedRecipeId);
    selectedRecipe.ingredients = selectedRecipe.ingredients.filter(ingredient => !ingredient.complete);
    saveAndRender()
  })
  
  deleteRecipeButton.addEventListener('click', () => {
    Recipes = Recipes.filter(Recipe => Recipe.id !== selectedRecipeId);
    selectedRecipeId = null;
    saveAndRender()
  })
  
  newRecipeForm.addEventListener('submit', e => {
    e.preventDefault()
    const RecipeName = newRecipeInput.value;
    if (RecipeName == null || RecipeName === '') return;
    const Recipe = createRecipe(RecipeName);
    newRecipeInput.value = null;
    Recipes.push(Recipe)
    saveAndRender()
  })
  
  newIngredientForm.addEventListener('submit', e => {
    e.preventDefault()
    const ingredientName = newIngredientInput.value;
    const ingredientAmount = newIngredientAmount.value;
    const ingredientMeasurement = newIngredientMeasurement.value;
    if (ingredientName == null || ingredientName === '') return;
    const ingredient = createIngredient(ingredientName, ingredientAmount, ingredientMeasurement);
    newIngredientInput.value = null;
    const selectedRecipe = Recipes.find(Recipe => Recipe.id === selectedRecipeId);
    selectedRecipe.ingredients.push(ingredient);
    saveAndRender()
  })
  
  
  function saveAndRender() {
    save()
    render()
  }
  
  
  
  function render() {
    clearElement(RecipesContainer)
    renderRecipes()
  
    const selectedRecipe = Recipes.find(Recipe => Recipe.id === selectedRecipeId);
    if (selectedRecipeId == null) {
      RecipeDisplayContainer.style.display = 'none';
    } else {
      RecipeDisplayContainer.style.display = '';
      RecipeTitleElement.innerText = selectedRecipe.name;
      renderIngredientCount(selectedRecipe)
      clearElement(ingredientsContainer)
      renderIngredients(selectedRecipe)
    }
  }
  
  
  
  function renderIngredients(selectedRecipe) {
    selectedRecipe.ingredients.forEach(ingredient => {
  
      const ingredientElement = document.importNode(ingredientTemplate.content, true);
      const checkbox = ingredientElement.querySelector('input');
      checkbox.id = ingredient.id;
      checkbox.checked = ingredient.complete;
      const label = ingredientElement.querySelector('label');
      const amountSpan = ingredientElement.querySelector('.ingredient-amount');
      const measurementSpan = ingredientElement.querySelector('.ingredient-measurement');
      label.htmlFor = ingredient.id;
      label.append(ingredient.name);
      amountSpan.innerText = ingredient.amount;
      measurementSpan.innerText = ingredient.measurement;
      measurementSpan.value = ingredient.measurement;
      ingredientsContainer.appendChild(ingredientElement);
    });
  }
  
  function renderRecipes() {
    Recipes.forEach(Recipe => {
      const RecipeElement = document.createElement('li');
      RecipeElement.dataset.RecipeId = Recipe.id;
      RecipeElement.classList.add("recipe-name");
      RecipeElement.innerText = Recipe.name;
      if (Recipe.id === selectedRecipeId) {
        RecipeElement.classList.add('active-recipe');
      }
      RecipesContainer.appendChild(RecipeElement);
    })
  }
  
  
  render()


})();

