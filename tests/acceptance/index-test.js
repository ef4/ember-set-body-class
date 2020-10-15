import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, fillIn, visit } from '@ember/test-helpers';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('updates body class', async function (assert) {
    await visit('/');
    assert.dom(document.body).hasClass('red-text');

    await click('input[name=blueBackground]');
    assert.dom(document.body).hasClass('red-text').hasClass('blue-background');

    await click('input[name=redText]');
    assert.dom(document.body).doesNotHaveClass('red-text').hasClass('blue-background');

    await fillIn('input[name=dynamicClassName]', 'blue-background');
    await click('input[name=blueBackground]');
    assert.dom(document.body).hasClass('blue-background');
  });
});
