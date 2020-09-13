import Ember from 'ember';

export default Ember.Component.extend({
    languageService: Ember.inject.service("language"),
    availableLanguages: null,
    selectedLanguage : null,
    
    actions: {
      select(language) {
         this.set('selectedLanguage', language);
         this.attrs.onSelectLanguage(language);
      }
    },
    didInsertElement() {
        this._super(...arguments);
        var regionId = this.get("regionId");
        this.get('languageService').availableLanguages().then((data) => {
           this.set('availableLanguages', data.TranslationLanguageOut);
      });
    },

});
