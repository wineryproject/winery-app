import Ember from 'ember';

export default Ember.Component.extend({
    countryService : Ember.inject.service("country"),
    availableCountries : null,
    selectedCountry : null,

    actions: {
      select(country) {
         this.set('selectedCountry', country);
         this.attrs.onSelectCountry(country);
      }
    }
    ,didInsertElement () {
      this._super(...arguments);
      this.get('countryService').availableCountries().then((data) => {
         this.set('availableCountries', data.CountryListOut);
      });
    }
});



