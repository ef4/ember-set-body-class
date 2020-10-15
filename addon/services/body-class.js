import Service from '@ember/service';
import { computed, observer } from '@ember/object';
import { A } from '@ember/array';
import { once, cancel } from '@ember/runloop';
import getDOM from '../util/get-dom';

export default Service.extend({
  register(component) {
    this._dom = getDOM(component);
    this.get('components').addObject(component);
  },

  deregister(component) {
    this.get('components').removeObject(component);
  },

  components: computed(() => A()),

  init() {
    this._super(...arguments);
    this.get('names');
  },

  names: computed('components.@each.name', function () {
    return this.get('components')
      .map(c => (c.get('name') ? String(c.get('name')).split(/\s+/) : []))
      .reduce((a, b) => A(a.concat(b)), A())
      .uniq();
  }),

  scheduleUpdate: observer('names.[]', function () {
    this.scheduledRun = once(this, this.updateBodyClass);
  }),

  updateBodyClass() {
    if (!this._dom) {
      return;
    }

    let body = this._dom.body;
    let attr = body.getAttribute('class');
    let classList = A(attr ? attr.split(/\s+/) : []);

    classList.removeObjects(this._previousNames || []);
    classList.addObjects(this.get('names'));

    this._previousNames = this.get('names');

    body.setAttribute('class', classList.join(' '));
  },

  willDestroy() {
    cancel(this.scheduledRun);
  },
});
