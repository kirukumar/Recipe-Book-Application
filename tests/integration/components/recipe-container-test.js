import { module, test } from 'qunit';
import { setupRenderingTest } from 'recipe-book-application/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | recipe-container', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<RecipeContainer />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <RecipeContainer>
        template block text
      </RecipeContainer>
    `);

    assert.dom().hasText('template block text');
  });
});
