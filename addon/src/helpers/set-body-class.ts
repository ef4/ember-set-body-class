import Helper from '@ember/component/helper';
import { guidFor } from '@ember/object/internals';
import type BodyClassService from '../services/body-class';
import * as emberService from '@ember/service';

const service = emberService.service ?? emberService.inject;

export default class SetBodyClassHelper extends Helper {
  @service declare bodyClass : BodyClassService;

  id = guidFor(this);

  override compute([_classNames]: [string]) {
    let classNames = _classNames ? _classNames.split(/\s+/) : [];
    this.bodyClass.register(this.id, classNames);
  }

  override willDestroy() {
    super.willDestroy();
    this.bodyClass.deregister(this.id);
  }
}
