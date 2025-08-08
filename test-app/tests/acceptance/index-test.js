import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { click, fillIn, visit } from '@ember/test-helpers';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('updates body class', async function (assert) {
    await visit('/');
    assert.dom(document.body).hasClass('red-text').hasClass('unrelated-class');

    // ensure that `{{set-body-class}}` does not render anything to the DOM
    let selectBox = this.element.querySelector('[data-test-select]');
    let app = selectBox.parentElement;
    assert.equal(app.firstElementChild.tagName, 'LABEL');

    await click('input[name=blueBackground]');
    assert
      .dom(document.body)
      .hasClass('red-text')
      .hasClass('blue-background')
      .hasClass('unrelated-class');

    await click('input[name=redText]');
    assert
      .dom(document.body)
      .doesNotHaveClass('red-text')
      .hasClass('blue-background')
      .hasClass('unrelated-class');

    await fillIn('input[name=dynamicClassName]', 'blue-background');
    await click('input[name=blueBackground]');
    assert.dom(document.body).hasClass('blue-background').hasClass('unrelated-class');
  });
});
