import { getOwner } from '@ember/application';
import Service from '@ember/service';
import { A } from '@ember/array';
import { once, cancel } from '@ember/runloop';

export default class BodyClassService extends Service {
  _dom = getOwner(this).lookup('service:-document');
  _fastboot = getOwner(this).lookup('service:fastboot');
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
    const allNames = new Set();
    for (const classNames of this.registrations.values()) {
      for (const className of classNames) {
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

    const registeredClassNames = this.names;

    const body = this._dom.body;
    const attr = body.getAttribute('class');
    const classList = A(attr ? attr.split(/\s+/) : []);

    classList.removeObjects(this._previousNames || []);
    classList.addObjects(registeredClassNames);

    this._previousNames = registeredClassNames;

    body.setAttribute('class', classList.join(' '));
  }

  willDestroy() {
    super.willDestroy();
    if (this._fastboot && this._fastboot.isFastBoot && this.scheduledRun) {
      // prevent FastBoot from removing the CSS classes
      // again before the response is sent out
      cancel(this.scheduledRun);
    }
  }
}