import ShareButton from './share-button';

export default ShareButton.extend({
  shareURL: 'https://winerylabs.com/artifact/data/wineries/alsa-mein-wein-520968475',
  classNames: ['btn-code'],
  attributeBindings: ['titleName:title'],
  shareAltIntro: 'Share on Code ',
  hashtags: '',
  click() {
    let urlProtocolIndex = this.getCurrentUrl().indexOf('//');
    let urlRoot = this.getCurrentUrl().indexOf('/',urlProtocolIndex+2);
    let urlEnding = this.getCurrentUrl().substring(urlRoot+1);
    let url = "https://winerylabs.com/artifact/data/"+urlEnding;
    this.openSharePopup(url);
  }
});

function getDomain(url) {
  var hostName = getHostName(url);
  var domain = hostName;
  
  if (hostName != null) {
      var parts = hostName.split('.').reverse();
      
      if (parts != null && parts.length > 1) {
          domain = parts[1] + '.' + parts[0];
              
          if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) {
            domain = parts[2] + '.' + domain;
          }
      }
  }
  
  return domain;
}

function getHostName(url) {
  var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
  if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
  return match[2];
  }
  else {
      return null;
  }
}

function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("://") > -1) {
      hostname = url.split('/')[2];
  }
  else {
      hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
}

// To address those who want the "root domain," use this function:
function extractRootDomain(url) {
  var domain = extractHostname(url),
      splitArr = domain.split('.'),
      arrLen = splitArr.length;

  //extracting the root domain here
  //if there is a subdomain 
  if (arrLen > 2) {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
          //this is using a ccTLD
          domain = splitArr[arrLen - 3] + '.' + domain;
      }
  }
  return domain;
}
