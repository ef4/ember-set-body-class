import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Acceptance | CSS class bleeding between tests', function (hooks) {
  setupRenderingTest(hooks);

  test('test 1 sets a class', async function (assert) {
    assert.dom(document.body).hasNoClass('foo');
    await render(hbs`{{set-body-class "foo"}}`);
    assert.dom(document.body).hasClass('foo');
  });

  test('test 2 ensures that the class is not set anymore', async function (assert) {
    assert.dom(document.body).hasNoClass('foo');
  });
});
