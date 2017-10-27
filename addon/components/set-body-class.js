import Component from '@ember/component';
import getDOM from '../util/get-dom';

export default Component.extend({
  tagName: '',
  init() {
    this._super(...arguments);
    let body = getDOM(this).body;
    let attr = body.getAttribute('class');
    let name = this.get('name');
    if (attr) {
      let classList = attr.split(/\s+/);
      if (classList.indexOf(name) === -1) {
        classList.push(name);
        body.setAttribute('class', classList.join(' '));
      }
    } else {
      body.setAttribute('class', name);
    }
  },
  willDestroyElement() {
    this._super(...arguments);
    let body = getDOM(this).body;
    let attr = body.getAttribute('class');
    let name = this.get('name');
    if (attr) {
      let classList = attr.split(/\s+/);
      let index = classList.indexOf(name);
      if (index !== -1) {
        classList.splice(index, 1);
        body.setAttribute('class', classList.join(' '));
      }
    }
  }
}).reopenClass({
  positionalParams: ['name']
});
