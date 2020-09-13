import ShareButton from './share-button'

export default ShareButton.extend({
  //layout,
  shareURL: 'https://www.pinterest.com/pin/create/button/',
  classNames: ['btn-pinterest'],
  attributeBindings: ['titleName:title'],
  shareAltIntro: 'Share on pinterest ',

  click() {
    let url = this.get('shareURL');
    url += '?url=' + encodeURIComponent(this.getCurrentUrl());
    this.openSharePopup(url);
  }
});