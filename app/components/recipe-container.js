import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RecipeContainer extends Component {
  @service recipeHandler;
  @tracked isExpandable = false;
  @tracked isFavourite = false;

  constructor() {
    super(...arguments);
    this.isFavourite = this.checkFavouriteStatus();
  }

  get isFavourite() {
    return this.checkFavouriteStatus();
  }
  checkFavouriteStatus() {
    return this.recipeHandler
      .getFavoriteRecipesFromLocalStorage()
      .includes(this.args.recipe.id);
  }

  @action
  toggle() {
    this.isExpandable = !this.isExpandable;
  }

  @action
  toggleFavorite(event) {
    event.stopPropagation();
    this.isFavourite = !this.isFavourite;
    this.recipeHandler.toggleFavorite(this.args.recipe.id, this.isFavourite);
  }
}
