import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';
export default class FavouritesRoute extends Route {

  @service store;
  @service recipeHandler;

async model() {
   let favourites = this.recipeHandler.getFavoriteRecipesFromLocalStorage();
   return this.store.peekAll('recipe').filter(recipe => favourites.includes(recipe.id));
  }

}
