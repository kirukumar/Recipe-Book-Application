import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RecipesDetailsRoute extends Route {
  @service store;
  @service recipeHandler;

  async model(params) {
    await this.recipeHandler.loadRecipes();
    return this.store.peekRecord('recipe', params.recipe_id);
  }
}
