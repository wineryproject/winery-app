import ShareButton from './share-button';

export default ShareButton.extend({
  shareURL: '',
  classNames: ['btn-pdf'],
  shareAltIntro: 'Open as PDF ',
  hashtags: '',

  click() {
    let urlProtocolIndex = this.getCurrentUrl().indexOf('//');
    let urlRoot = this.getCurrentUrl().indexOf('/',urlProtocolIndex+2);
    let urlEnding = this.getCurrentUrl().substring(urlRoot+1);
    let url = "https://winerylabs.com/artifact/data/"+urlEnding+".pdf";
    this.openSharePopup(url);
  }
});