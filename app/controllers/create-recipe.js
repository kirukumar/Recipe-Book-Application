import Controller from '@ember/controller';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';

export default class CreateRecipeController extends Controller {

@service recipeHandler;
@service router;

@tracked title = '';
@tracked description = '';
@tracked ingredients = '';
@tracked instructions = '';

@action
updateTitle(event) {
this.title = event.target.value;
}

@action
updateDescription(event) {
this.description = event.target.value;
}

@action
updateIngredients(event) {
this.ingredients = event.target.value;
}

@action
updateInstructions(event) {
this.instructions = event.target.value;
}

@action
createRecipe(event) {
event.preventDefault();

let newRecipe = {
id:this.recipeHandler.generateUUID(),
title: this.title,
description: this.description,
ingredients: this.ingredients.split(',').map(item => item.trim()),
instructions: this.instructions
};

this.recipeHandler.addRecipe(newRecipe);
this.router.transitionTo('recipes');
}

}
