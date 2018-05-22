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
    let namesToSet = nameToSet ? nameToSet.split(/\s+/) : [];
    let namesToRemove = nameToRemove ? nameToRemove.split(/\s+/) : [];
    
    namesToRemove.forEach(name => {
      let index = classList.indexOf(name);
      if (index !== -1) {
        classList.splice(index, 1);
      }
    });

    namesToSet.forEach(name => {
      if (classList.indexOf(name) === -1) {
        classList.push(name);
      }
    });

    body.setAttribute('class', classList.join(' '));
  }
}).reopenClass({
  positionalParams: ['name']
});
