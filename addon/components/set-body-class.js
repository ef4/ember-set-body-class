import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  bodyClass: service(),

  didInsertElement() {
    this._super(...arguments);
    this.get('bodyClass').register(this);
  },

  willDestroyElement() {
    this.get('bodyClass').deregister(this);
    this._super(...arguments);
  }
  
}).reopenClass({
  positionalParams: ['name']
});
