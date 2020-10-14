import { getOwner } from '@ember/application';

// cribbed from ember-wormhole. This uses private API.
export default function getDOM(context) {
  let { renderer } = context;
  if (!renderer._dom) { // pre glimmer2
    let container = getOwner ? getOwner(context) : context.container;
    let documentService = container.lookup('service:-document');

    if (documentService) { return documentService; }

    renderer = container.lookup('renderer:-dom');
  }

  if (renderer._dom && renderer._dom.document) { // pre Ember 2.6
    return renderer._dom.document;
  } else {
    throw new Error('ember-set-body-class could not get DOM');
  }
}
