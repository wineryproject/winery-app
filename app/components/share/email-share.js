import ShareButton from './share-button';

export default ShareButton.extend({
  //classNames: ['fb-share-button', 'share-button'],
  classNames: ['btn-mail'],
  attributeBindings: ['titleName:title'],
  shareAltIntro: 'Share on Email ',

  hashtag: Ember.computed('hashtags', function() {
    if (this.get('hashtags')) {
      let firstTag = this.get('hashtags').split(',').shift();
      return encodeURIComponent(`#${firstTag}`);
    }
  }),

  click() {
    let quote = this.get('quote') ? `&quote=${this.get('quote')}` : '';
    let hashtag = this.get('hashtag') ? `&hashtag=${this.get('hashtag')}` : '';
    let currentUrl = encodeURIComponent(this.getCurrentUrl());
    let wpEmail = encodeURIComponent("thewineryproject@gmail.com");
    var email = "mailto:?subject=WineryProject: "+this.get('title');
    email+="&body=Links%0D%0A"+currentUrl;
    email+="%0D%0A%0D%0ATags%0D%0A"+this.get('hashtags');
    email+="%0D%0A%0D%0A"+wpEmail;

    window.location.href=email;
  }
});