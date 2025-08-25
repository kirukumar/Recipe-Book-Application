import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RecipeContainer extends Component {

    @tracked isExpandable = false;

    @action
    toggle() {
        this.isExpandable = !this.isExpandable;
    }

}
