import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import Component from '@ember/component';

module('Unit | Service | body class', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('component:fake-component', Component.extend())
  });

  test('it collects names from all registered components', function(assert) {
    let service = this.owner.lookup('service:body-class');
    let component1 = this.owner.factoryFor('component:fake-component').create({name: 'dog'});
    let component2 = this.owner.factoryFor('component:fake-component').create({name: 'horse cow'});

    run(() => {
      service.register(component1);
      service.register(component2);
    });


    assert.deepEqual(service.get('names'), ['dog', 'horse', 'cow'], 'should collect names from registered components');

    run(() => service.deregister(component2));

    assert.deepEqual(service.get('names'), ['dog'], 'should update whenever component was deregistered');

    run(() => component1.set('name', 'cow'));

    assert.deepEqual(service.get('names'), ['cow'], 'should update whenever component name was updated');

    run(() => service.register(component2));

    assert.deepEqual(service.get('names'), ['cow', 'horse'], 'should remove duplicate names');

    run(() => service.deregister(component1));

    assert.deepEqual(service.get('names'), ['horse', 'cow'], 'should work with repeated class names');

    run(() => component2.set('name', undefined));

    assert.deepEqual(service.get('names'), [], 'should work with non-string values');
  });

  test('it updates body class', function(assert) {
    let service = this.owner.lookup('service:body-class');
    service._dom = document;

    document.querySelector('body').className += ' cactus';
    run(() => service.set('names', ['cow', 'horse']));

    assert.ok(document.querySelector('body.cow.horse'), 'should set .cow.horse class on body element');
    assert.ok(document.querySelector('body.cactus'), 'should keep existing classes (.cactus)');

    document.querySelector('body').className += ' pine';
    run(() => service.set('names', ['elephant']));

    assert.ok(document.querySelector('body.elephant'), 'should set .elephant class on body element');
    assert.ok(document.querySelector('body.cactus.pine'), 'should keep existing classes (.cactus.pine)');
    assert.notOk(document.querySelector('body.cow'), 'should remove .cow class from body element');
    assert.notOk(document.querySelector('body.horse'), 'should remove .horse class from body element');
  });
});
