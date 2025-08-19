import Model, { attr } from '@ember-data/model';

export default class RecipeModel extends Model {

@attr('string') title;
@attr('string') description;
@attr('array') ingredients;
@attr('string') instructions;

}
