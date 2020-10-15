import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('Fastboot | set-body-class', function (hooks) {
  setup(hooks);

  test('it works', async function (assert) {
    let { htmlDocument } = await visit('/');
    assert.ok(htmlDocument.body.classList.contains('red-text'));
    assert.ok(htmlDocument.body.classList.contains('small-text'));
  });
});
