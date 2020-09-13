import ShareButton from './share-button';

export default ShareButton.extend({
  shareURL: 'https://www.linkedin.com/shareArticle',
  classNames: ['btn-linkedin'],
  attributeBindings: ['titleName:title'],
  shareAltIntro: 'Share on LinkedIn ',
  hashtags: '',
  click() {
    let url = this.get('shareURL');
    url += '?mini=true';
    url += '&url=' + encodeURIComponent(this.getCurrentUrl());
    url += '&title=' + this.get('title');
    url += '&summary=' + this.get('text');
    url += this.get('via') ? '&source=' + this.get('via') : '';

    this.openSharePopup(url);
  }
});