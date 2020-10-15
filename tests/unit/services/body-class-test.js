import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';


module('Unit | Service | body class', function(hooks) {
  setupRenderingTest(hooks);

  const Component = EmberObject.extend({
    renderer: { _dom: { document } }
  });

  test('it collects names from all registered components', function(assert) {
    let service = this.owner.lookup('service:body-class');

    let component1 = Component.create({ name: 'dog' });
    let component2 = Component.create({ name: 'horse cow' });

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

    assert.dom(document.body)
      .hasClass('cow', 'should set .cow class on body element')
      .hasClass('horse', 'should set .horse class on body element')
      .hasClass('cactus', 'should keep existing classes (.cactus)');

    document.querySelector('body').className += ' pine';
    run(() => service.set('names', ['elephant']));

    assert.dom(document.body)
      .hasClass('elephant', 'should set .elephant class on body element')
      .hasClass('cactus', 'should keep existing classes (.cactus)')
      .hasClass('pine', 'should keep existing classes (.pine)')
      .doesNotHaveClass('cow', 'should remove .cow class from body element')
      .doesNotHaveClass('horse', 'should remove .horse class from body element');
  });
});
