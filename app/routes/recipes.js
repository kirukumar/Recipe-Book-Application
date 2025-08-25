import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RecipesRoute extends Route {
  @service recipeHandler;

  async model() {
    return this.recipeHandler.loadRecipes();
  }
}
