import Service, { inject as service } from '@ember/service';

export default class RecipeHandlerService extends Service {

  @service store;

 createdData= [];

  async loadRecipes() {
      let response = await fetch('/api/recipes.json');
      let data = await response.json();
      let localStorageItems = this.recipesFromLocalStorage();
      this.checkCreateItemsinStores(data.recipes);
      this.checkCreateItemsinStores(localStorageItems);
  }

  // Add recipes to Ember Data store if not already present

  // Add recipes to Ember Data store if not already present
  checkCreateItemsinStores(recipes) {
    let deletedIds = this.getDeletedIdsFromLocalStorage();
    recipes.forEach((recipe) => {
      let existingRecipe = this.store.peekRecord('recipe', recipe.id);
      if (!existingRecipe && !deletedIds.includes(recipe.id)) {
        this.store.createRecord('recipe', {
          id: recipe.id,
          title: recipe.title,
          description: recipe.description,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        });
      }
    });
  }

  // Get recipes from localStorage
  recipesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('recipes') || '[]');
  }

  // Add a recipe to localStorage
  async addRecipe(recipeData) {
    let recipes = this.recipesFromLocalStorage();
    recipes.push(recipeData);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    return recipeData;
  }

  // Generate a UUID for new recipes
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Only From Local Storage
  async deleteRecipe(recipeId) {
    this.removeRecipeFromLocalStorage(recipeId);
    this.addDeletedIdsToLocalStorage(recipeId);
    this.store.peekRecord('recipe', recipeId)?.destroyRecord();
  }


  removeRecipeFromLocalStorage(recipeId){
    let recipes = this.recipesFromLocalStorage();
    let newRecipes = recipes.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem('recipes', JSON.stringify(newRecipes));
  }

  addDeletedIdsToLocalStorage(recipeId) {
    let deletedIds = this.getDeletedIdsFromLocalStorage();
    deletedIds.push(recipeId);
    localStorage.setItem('deletedRecipeIds', JSON.stringify(deletedIds));
  }

  getDeletedIdsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('deletedRecipeIds') || '[]');
  }

  toggleFavorite(recipeId, isFavorite) {
    let favorites = this.getFavoriteRecipesFromLocalStorage();
    if (isFavorite) {
      favorites.push(recipeId);
    } else {
      favorites = favorites.filter(id => id !== recipeId);
    }
    localStorage.setItem('favoriteRecipeIds', JSON.stringify(favorites));
  }

  getFavoriteRecipesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('favoriteRecipeIds') || '[]');
  }
  
}
