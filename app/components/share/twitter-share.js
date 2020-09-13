//import ShareButton from 'ember-social-share/components/share-button';
//import layout from 'ember-social-share/templates/components/twitter-share-button';
import ShareButton from './share-button';

export default ShareButton.extend({
  //    //"ember-social-share": "^0.3.0", in package.json
  shareURL: 'https://twitter.com/intent/tweet',
  classNames: ['btn-twitter'],
  //apparently attributeBindings 'titleName:title' cannot be set in ShareButton!! ??
  attributeBindings: ['titleName:title'],
  hashtags: '',
  click() {
    let url = this.get('shareURL');
    url += '?text=' + this.get('title');
    url += '&url=' + encodeURIComponent(this.getCurrentUrl());
    url += this.get('hashtags') ? '&hashtags=' + this.get('hashtags') : '';
    url += this.get('via') ? '&via=' + this.get('via') : '';

    this.openSharePopup(url);
  }
});
