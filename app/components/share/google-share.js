import ShareButton from './share-button';

export default ShareButton.extend({
  shareURL: 'https://plus.google.com/share',
  classNames: ['btn-google'],
  attributeBindings: ['titleName:title'],
  shareAltIntro: 'Share on LinkedIn ',
  click() {
    let url = this.get('shareURL');
    url += '?url=' + encodeURIComponent(this.getCurrentUrl());
    this.openSharePopup(url);
  }
});