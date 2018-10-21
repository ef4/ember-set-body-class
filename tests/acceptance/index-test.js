import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | index');

test('updates body class', function(assert) {
  visit('/');

  andThen(() => {
    assert.ok(document.querySelector('body.red-text'), 'should find .red-text on body');

    click('input[name=blueBackground]');

    andThen(() => {
      assert.ok(document.querySelector('body.red-text.blue-background'), 'should find both classes body');

      click('input[name=redText]');

      andThen(() => {
        assert.notOk(document.querySelector('body.red-text'), 'should not find .red-text body');
        assert.ok(document.querySelector('body.blue-background'), 'should find .blue-background body');

        fillIn('input[name=dynamicClassName]', 'blue-background');
        click('input[name=blueBackground]');

        andThen(() => {
          assert.ok(document.querySelector('body.blue-background'), 'should still find .blue-background body');
        });

      });

    });

  });

});
