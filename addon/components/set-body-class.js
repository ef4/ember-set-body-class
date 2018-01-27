import Component from '@ember/component';
import getDOM from '../util/get-dom';

export default Component.extend({
  tagName: '',

  didReceiveAttrs() {
    this._super(...arguments);
    let name = this.get('name');
    this._updateBodyClass(this._stashedName, name);
    this._stashedName = name;
  },

  willDestroyElement() {
    this._super(...arguments);
    let name = this.get('name');
    this._updateBodyClass(name, null);
    this._stashedName = null;
  },

  _updateBodyClass(nameToRemove, nameToSet) {
    let body = getDOM(this).body;
    let attr = body.getAttribute('class');
    let classList = attr ? attr.split(/\s+/) : [];

    if (nameToSet) {
      if (classList.indexOf(nameToSet) === -1) {
        classList.push(nameToSet);
      }
    }

    if (nameToRemove) {
      let index = classList.indexOf(nameToRemove);
      if (index !== -1) {
        classList.splice(index, 1);
      }
    }

    body.setAttribute('class', classList.join(' '));
  }
}).reopenClass({
  positionalParams: ['name']
});
