import Ember from 'ember';

import PostEntityAdapter from '../../adapters/post-entity';
import {notifySuccess, notifyFailure} from '../../utils/notification-utils';

export default Ember.Component.extend({

  tagName : '',
  
  isValidEmail: Ember.computed.match('model.email', /^.+@.+\..+$/),
  isValidFirstName : Ember.computed.gte('model.firstName.length', 2),
  isValidLastName : Ember.computed.gte('model.lastName.length', 2),
  isValidDomain : Ember.computed.gte('model.domain.length', 5),
  isValidDescription : Ember.computed.gte('model.description.length', 2),
  isValidCountry : Ember.computed.gte('model.countryId', 0),
  isValidRegion : Ember.computed.gte('model.regionId', 0),
  isValidLieuDit : Ember.computed.gte('model.lieuDitId', 0),
  isValidCepages : Ember.computed.gt('model.cepageIds.length', 0), //TODO use not empty


//TUTO nested computed value
  isDisabled: Ember.computed('isValidEmail',
                             'isValidFirstName', 
                             'isValidLastName', 
                             'isValidDescription',
                             'isValidDomain',
    function() {
      return !(this.get('isValidEmail') 
               && this.get('isValidFirstName') 
               && this.get('isValidLastName')
               && this.get('isValidDomain')
               && this.get('isValidDescription')
               )
  })

  ,selectedCountry : null 
  ,selectedRegion : null 
  ,selectedLieuDit : null 
  ,selectedGrades : null 
  ,selectedLanguage : null 

  ,isSent : false
  
  ,actions : {
    selectCountry(country) {
      this.set("selectedCountry", country);
      this.set("model.countryId", country.id);
      this.set("model.countryName", country.name);
      this.set("model.regionId", -1);
    },
    selectRegion(region) {
      this.set("selectedRegion", region);
      this.set("model.regionId", region.id);
      this.set("model.regionName", region.name);
      this.set("model.lieuDitId", -1);
    },
    selectGrades(grades) {
      this.set("selectedGrades", grades);
      this.set("model.grapeIds", grades);//TODO lodash from grades
    },
    selectLieuDit (lieuDit) {
      this.set("selectedLieuDit", lieuDit);
      this.set("model.lieuDitId", lieuDit.id);
      this.set("model.lieuDitName", lieuDit.name);
    },
    selectLanguage (language) {
      this.set("selectedLanguage", language);
      this.set("model.languageCode", language.code);
    },
    request (request) {
        this.set('isSent', true);
        var adapter = PostEntityAdapter.create();
        adapter.registerWithAddress(this.get("model"))
          .then (data => {
             this.set('isSent', false);
             notifySuccess(this, "notification.domain-successfully-requested");
          })
          .catch(x => {
             this.set('isSent', false);
             notifyFailure(this, "notification.unexpected-error-processing-request");
             console.log("error "+x.responseJSON.cause);
          });
     }  
  }
});
