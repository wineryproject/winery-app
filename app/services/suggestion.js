import Ember from 'ember';

import SuggestionAdapter from '../adapters/search';

export default Ember.Service.extend({

    homePageSuggestions: function(languageCode, longitude, latitude) {
        var adapter = SuggestionAdapter.create(); 
        return adapter.homePageSuggestions(languageCode, longitude, latitude);
    }

});
