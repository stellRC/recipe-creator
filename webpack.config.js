const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    clear: './src/clear.js',
    ingredient: './src/ingredient.js',
    createRecipe: './src/createRecipe.js',
    save: './src/save.js',
    count: './src/renderIngredientCount.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};