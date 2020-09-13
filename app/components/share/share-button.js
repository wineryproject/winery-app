import Ember from 'ember';
import { computed } from '@ember/object';

export default Ember.Component.extend({
  tagName: 'button',
  title: '',
  text: '',
  image: '',
  shareAltIntro: '',
  classNameBindings: ['adaptive:adaptive-button'],
  adaptive: true,
  titleName: computed(
    'title'
    , function() {
      return this.get('shareAltIntro')+' '+this.get('title');//TODO i18n
    }
  ),

  getCurrentUrl() {
    return this.get('url') ? this.get('url') : document.location.href;
  },

  getPopupPosition() {
    const dualScreenLeft = screen.availLeft;
    const dualScreenTop = screen.availTop;

    const windowWidth = screen.availWidth;
    const windowheight =  screen.availHeight;

    const left = ((windowWidth / 2) - (600 / 2)) + dualScreenLeft;
    const top = ((windowheight / 2) - (600 / 2)) + dualScreenTop;

    return {left: left, top: top};
  },

  openSharePopup(url) {
    let popupPosition = this.getPopupPosition();
    var newWindow = window.open(url, 'Facebook',
    'location=no,toolbar=no,menubar=no,scrollbars=no,status=no, width=600, height=600, top=' + popupPosition.top + ', left=' + popupPosition.left);

    if (typeof(newWindow) !== 'undefined' && newWindow !== null && newWindow.focus) {
      newWindow.focus();
    }
  }
});
