import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from 'ember-test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';
import Service from '@ember/service';

const serviceStub = Service.extend();

module('Integration | Component | set body class', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:body-class', serviceStub);
  });

  test('registers in the body-class service', async function(assert) {
    assert.expect(3);

    let service = this.owner.lookup('service:body-class');
    service.register =   sinon.spy();
    service.deregister = sinon.spy();

    await render(hbs`
      {{set-body-class "hello"}}
      {{#if showIt}}
        {{set-body-class "goodbye"}}
      {{/if}}
    `);

    assert.ok(service.register.calledOnce, 'the first component should register');

    this.set('showIt', true);

    assert.ok(service.register.calledTwice, 'the second component should register');

    this.set('showIt', false);

    assert.ok(service.deregister.calledOnce, 'the second component should deregister');
  });

  test('does not output a DOM element for {{set-body-class}}', async function(assert) {
    let service = this.owner.lookup('service:body-class');
    service.register =   sinon.stub();
    service.deregister = sinon.stub();

    await render(hbs`
      {{set-body-class "hello"}}
    `);

    assert.equal(this.element.children.length, 0);
  });
});
