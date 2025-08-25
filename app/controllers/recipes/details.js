import Controller from '@ember/controller';
import {action} from '@ember/object';
import { inject as service } from '@ember/service';

export default class RecipesDetailsController extends Controller {

    @service recipeHandler;
    @service router;

    @action
    deleteRecipe(){
        this.recipeHandler.deleteRecipe(this.model.id);
        this.router.transitionTo('recipes');
    }
}
