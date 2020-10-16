import Helper from '@ember/component/helper';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';

export default class SetBodyClassHelper extends Helper {
  @service bodyClass;

  id = guidFor(this);

  compute([_classNames]) {
    let classNames = _classNames ? _classNames.split(/\s+/) : [];
    this.bodyClass.register(this.id, classNames);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.bodyClass.deregister(this.id);
  }
}
