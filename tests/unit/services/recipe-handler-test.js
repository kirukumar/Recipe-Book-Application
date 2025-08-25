import { module, test } from 'qunit';
import { setupTest } from 'recipe-book-application/tests/helpers';

module('Unit | Service | recipe-handler', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:recipe-handler');
    assert.ok(service);
  });
});
