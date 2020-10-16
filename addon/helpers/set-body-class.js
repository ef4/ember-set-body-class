import Helper from '@ember/component/helper';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';

export default Helper.extend({
  bodyClass: service(),

  init() {
    this._super(...arguments);
    this.id = guidFor(this);
  },

  willDestroy() {
    this._super(...arguments);
    this.bodyClass.deregister(this.id);
  },

  compute([_classNames]) {
    let classNames = _classNames ? _classNames.split(/\s+/) : [];
    this.bodyClass.register(this.id, classNames);
  },
});
