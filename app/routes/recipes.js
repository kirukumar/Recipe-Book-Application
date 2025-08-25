import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class RecipesRoute extends Route {

  @service recipeHandler;
  @service store;

  async model() {
    // Adding Data to the store
    await this.recipeHandler.loadRecipes();

    // Returning data from the store
    return this.store.peekAll('recipe');
  }
}
