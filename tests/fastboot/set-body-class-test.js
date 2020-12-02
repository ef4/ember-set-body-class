import { module, test } from 'qunit';
import { setup, visit } from 'ember-cli-fastboot-testing/test-support';

module('Fastboot | set-body-class', function (hooks) {
  setup(hooks);

  test('it works', async function (assert) {
    let { htmlDocument } = await visit('/');
    assert.dom(htmlDocument.body).hasClass('red-text');
    assert.dom(htmlDocument.body).hasClass('small-text');
  });
});
