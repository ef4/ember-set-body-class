import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from 'ember-test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | set body class', function(hooks) {
  setupRenderingTest(hooks);

  test('adds first class', async function(assert) {
    assert.expect(1);
    await render(hbs`{{set-body-class "hello"}}`);
    assert.ok(document.querySelector('body.hello'), "should find .hello on body");
  });

  test('adds second class', async function(assert) {
    assert.expect(1);
    await render(hbs`{{set-body-class "hello"}}{{#if showIt}}{{set-body-class "goodbye"}}{{/if}}`);
    this.set('showIt', true);
    assert.ok(document.querySelector('body.hello.goodbye'), "should find both classes body");
  });

  test('removes non-last class', async function(assert) {
    assert.expect(2);
    this.set('showIt', true);
    await render(hbs`{{set-body-class "hello"}}{{#if showIt}}{{set-body-class "goodbye"}}{{/if}}`);
    this.set('showIt', false);
    assert.ok(document.querySelector('body.hello'), "should find hello body");
    assert.ok(!document.querySelector('body.goodbye'), "should not find hello goodbye");
  });

  test('removes last class', async function(assert) {
    assert.expect(2);
    this.set('showIt', true);
    await render(hbs`{{#if showIt}}{{set-body-class "hello"}}{{/if}}`);
    assert.ok(document.querySelector('body.hello'), "should find .hello on body");
    this.set('showIt', false);
    await settled();
    assert.ok(!document.querySelector('body.hello'), "should not find .hello on body");
  });

  test('bound class works', async function(assert) {
    assert.expect(3);
    this.set('dynamicName', 'hello');
    await render(hbs`{{set-body-class dynamicName}}`);
    assert.ok(document.querySelector('body.hello'), 'should find .hello on body');
    this.set('dynamicName', 'howdy');
    assert.ok(document.querySelector('body.howdy'), 'should find .howdy on body');
    assert.ok(!document.querySelector('body.hello'), 'should not find .hello on body');
  });

  test('behaves with undefined', async function(assert) {
    this.set('dynamicName', undefined);
    await render(hbs`{{set-body-class dynamicName}}`);
    assert.ok(!document.querySelector('body.undefined'), 'should not find .undefined on body');
  });

  test('behaves with null', async function(assert) {
    this.set('dynamicName', null);
    await render(hbs`{{set-body-class dynamicName}}`);
    assert.ok(!document.querySelector('body.null'), 'should not find .null on body');
  });

  test('adds multiple classes', async function(assert) {
    this.set('dynamicName', 'a b c');
    await render(hbs`{{set-body-class dynamicName}}`);
    assert.ok(document.querySelector('body.a.b.c'), 'should find a b and c on body');
  });

  test('removes some of multiple classes', async function(assert) {
    this.set('dynamicName', 'a b c');
    await render(hbs`{{set-body-class dynamicName}}`);
    this.set('dynamicName', 'a c');
    await settled();
    assert.ok(!document.querySelector('body.b'), 'should not b on body');
    assert.ok(document.querySelector('body.a.c'), 'should find a and c on body');
  });
});
