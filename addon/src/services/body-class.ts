import { getOwner } from '@ember/owner';
import Service from '@ember/service';
import { A } from '@ember/array';
import { once, cancel } from '@ember/runloop';
import type { EmberRunTimer } from '@ember/runloop/types';

export default class BodyClassService extends Service {
  _dom = getOwner(this)?.lookup('service:-document') as Document | undefined;
  _fastboot = getOwner(this)?.lookup('service:fastboot');
  registrations = new Map<string, string[]>();
  scheduledRun?: EmberRunTimer;
  _previousNames: string[] | undefined;


  register(id: string, classNames: string[]) {
    this.registrations.set(id, classNames);
    this.scheduleUpdate();
  }

  deregister(id: string) {
    this.registrations.delete(id);
    this.scheduleUpdate();
  }

  get names() {
    let allNames = new Set<string>();
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

    classList.removeObjects(A(this._previousNames || []));
    classList.addObjects(A(registeredClassNames));

    this._previousNames = registeredClassNames;

    body.setAttribute('class', classList.join(' '));
  }

  override willDestroy() {
    super.willDestroy();
    //@ts-expect-error
    if (this._fastboot && this._fastboot.isFastBoot) {
      // prevent FastBoot from removing the CSS classes
      // again before the response is sent out
      cancel(this.scheduledRun);
    }
  }
}
