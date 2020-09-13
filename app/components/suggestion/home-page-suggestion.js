import Ember from 'ember';

export default Ember.Component.extend({
    languageCode : 'en',
    longitude : null,
    latitude : null,
    data : null,
    searchResult : {result : null},

    suggestionService: Ember.inject.service("suggestion"),
    didInsertElement() {
        this._super(...arguments);
      //TODO via json object
        return this.get('suggestionService').homePageSuggestions(
            this.get("languageCode"),
            this.get("longitude"),
            this.get("latitude")
          ).then(
              (data) => {
                  this.set('data', data.LastUpdatedEntitiesSuggestionOut);
                  this.set('searchResult.result', data.LastUpdatedEntitiesSuggestionOut);
            }
        );
    }
});
