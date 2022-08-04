export default function createRecipe(name) {
    return { id: Date.now().toString(), name: name, ingredients: [] };
  }