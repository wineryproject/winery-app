import Ember from 'ember';
import {getUserLanguage} from '../utils/common-utils';
import ResetScrollPositionMixin from '../mixins/reset-scroll-position';
import {inject} from '@ember/service';
import ENV from '../config/environment';
import { computed } from '@ember/object';

export default Ember.Route.extend(ResetScrollPositionMixin,{
    
  translationsFetcher: inject(),
  i18n: inject(),
  titleToken: null,
  pageDescription : 'The wineries and wine events platform',
  authenticationRoute : "/accounts/login",
  //TODO remove env use environment
  env: ENV.environment,
  environment: ENV.environment,

  headTags : computed('pageDescription', 'headTagsBase',
    function() {
      let pageDescription = this.get("pageDescription");
      let headTags = this.get("headTagsBase");
      let descriptionNode =  {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: pageDescription
        }
      }
      headTags.push(descriptionNode);
      return headTags;
    }
  ),
  headTagsBase: [{
      type: 'meta',
      tagId: 'meta-og-name',
      attrs: {
        property: 'og:name',
        content: 'The winery project'
      }
    },
    /* TODO override like title
    {
      type: 'meta',
      tagId: 'meta-description-tag',
      attrs: {
        name: 'description',
        content: 'The wineries and wine events platform'
      }
    },
    */
    
    {
      type: 'link',
      tagId: 'canonical-link',
      attrs: {
        rel: 'canonical',
        content: 'https://wineryproject.com/'
      }
    }
    // twitter
    ,
    {
      type: 'meta',
      tagId: 'twitter-creator',
      attrs: {
        name: 'twitter:creator',
        content: '@WineryProject'
      }
    }
  ]
  ,
  beforeModel: function(params) {

    let i18nLocale = this.get('i18n.locale');
    let userLanguage = getUserLanguage();

    if (i18nLocale!=userLanguage) { 
      //!! i18n and userLanguage are set the first time=> no load
      //TODO make distinct between first time and rest maybe in initialize
      //this.set('i18n.locale', userLanguage);
      //this.get('translationsFetcher').fetch();
    }
  },

      /*TODO add method to add 
 
    {
      type: 'meta',
      tagId: 'meta-description-tag',
      attrs: {
        name: 'description',
        content: 'TODO Change'
      }
    },
    */
   metaDescription : function setMetaDescription(description) {
    this.get("headTags");
  }
  
  
});

export function setMetaDescription(description) {

}
