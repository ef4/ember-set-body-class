import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, fillIn, visit } from '@ember/test-helpers';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('updates body class', async function (assert) {
    await visit('/');
    assert.ok(document.querySelector('body.red-text'), 'should find .red-text on body');

    await click('input[name=blueBackground]');
    assert.ok(document.querySelector('body.red-text.blue-background'), 'should find both classes body');

    await click('input[name=redText]');
    assert.notOk(document.querySelector('body.red-text'), 'should not find .red-text body');
    assert.ok(document.querySelector('body.blue-background'), 'should find .blue-background body');

    await fillIn('input[name=dynamicClassName]', 'blue-background');
    await click('input[name=blueBackground]');
    assert.ok(document.querySelector('body.blue-background'), 'should still find .blue-background body');
  });
});
