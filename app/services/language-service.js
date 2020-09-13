import Ember from 'ember';
import Service from '@ember/service';

import LanguageAdapter from '../adapters/language';

export default Service.extend({

  availableLanguages() {
      var adapter = LanguageAdapter.create(); 
      // this simulates fetching data across the network
      return new Ember.RSVP.Promise(function(resolve) {     
      adapter.availableTranslation();
    });
  }

});
