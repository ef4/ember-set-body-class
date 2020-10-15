import Controller from '@ember/controller';

export default Controller.extend({
  redText: true,
  blueBackground: false,
  textSize: 'small-text',
  // eslint-disable-next-line ember/avoid-leaking-state-in-ember-objects
  textSizes: ['small-text', 'medium-text', 'large-text']
});
