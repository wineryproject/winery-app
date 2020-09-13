import Ember from 'ember';
import Service from '@ember/service';

import LanguageAdapter from '../adapters/language';
export default Service.extend({

  availableLanguages() {
    // this simulates fetching data across the network
    var adapter = LanguageAdapter.create(); 
    return adapter.availableTranslation();

  },
  cities() {
    // this simulates fetching data across the network
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.run.later(function() {
        resolve(["Paris", "Washington DC", "Bogota", "Nairobi", "Auckland"]);
      }, 3000);
    });
  }

});
