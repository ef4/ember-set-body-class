import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  redText = true;
  blueBackground = false;
  textSize = 'small-text';
  textSizes = ['small-text', 'medium-text', 'large-text'];
}
