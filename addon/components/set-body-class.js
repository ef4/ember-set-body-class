import Component from '@ember/component';
import getDOM from '../util/get-dom';

let globalClassList = [];

function removeObjects(array, objectsToRemove) {
  objectsToRemove.forEach(name => {
    let index = array.indexOf(name);
    if (index !== -1) {
      array.splice(index, 1);
    }
  });
}

function addObjects(array, objectsToAdd) {
  objectsToAdd.forEach(name => {
    array.push(name);
  });
}

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

    removeObjects(classList, globalClassList);

    removeObjects(globalClassList, namesToRemove);
    addObjects(globalClassList, namesToSet);

    addObjects(classList, globalClassList);

    body.setAttribute('class', classList.join(' '));
  }
}).reopenClass({
  positionalParams: ['name']
});
