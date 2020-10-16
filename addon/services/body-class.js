import { getOwner } from '@ember/application';
import Service from '@ember/service';
import { A } from '@ember/array';
import { once, cancel } from '@ember/runloop';

export default class BodyClassService extends Service {
  _dom = getOwner(this).lookup('service:-document');
  registrations = new Map();

  register(id, classNames) {
    this.registrations.set(id, classNames);
    this.scheduleUpdate();
  }

  deregister(id) {
    this.registrations.delete(id);
    this.scheduleUpdate();
  }

  get names() {
    let allNames = new Set();
    for (let classNames of this.registrations.values()) {
      for (let className of classNames) {
        allNames.add(className);
      }
    }
    return [...allNames];
  }

  scheduleUpdate() {
    this.scheduledRun = once(this, this.updateBodyClass);
  }

  updateBodyClass() {
    if (!this._dom) {
      return;
    }

    let registeredClassNames = this.names;

    let body = this._dom.body;
    let attr = body.getAttribute('class');
    let classList = A(attr ? attr.split(/\s+/) : []);

    classList.removeObjects(this._previousNames || []);
    classList.addObjects(registeredClassNames);

    this._previousNames = registeredClassNames;

    body.setAttribute('class', classList.join(' '));
  }

  willDestroy() {
    cancel(this.scheduledRun);
  }
}
