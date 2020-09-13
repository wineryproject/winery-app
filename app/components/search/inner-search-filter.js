import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import { computed } from '@ember/object';
import {getCountriesInfo} from '../../utils/common-utils';

export default Ember.Component.extend({
    tagName : '',

    perspective : null,

    appellationService: Ember.inject.service("appellation"),
    appellationFilter : false,
    appellations : [],

    countryService: Ember.inject.service("country"),
    countryFilter : false,
    countries : null,

    grapeService: Ember.inject.service("grape"),
    grapeFilter : false,
    grapes : null,

    colorService: Ember.inject.service("color"),
    colorFilter : false,
    colors : null,

    countriesInfo: storageFor('countries'),
    countryFlag: computed('countries', function() {
        return this.get('countriesInfo').includes(this.get('id'));
      }),

    didInsertElement() {
      this._super(...arguments);
      if (this.get('countryFilter')) {
        this.get('countryService').findAll().then((data) => {
            this.set('countries', data.CountryDescriptionOut);
            //var countries = getCountriesInfo();
            //this.get('countriesInfo').addObject(data.CountryDescriptionOut);
        });
      }
      if (this.get('appellationFilter')) {
        this.get('appellationService').findAll({}).then((data) => {
            this.set('appellations', data.AppelationBadgeOut);
        });
      }
      if (this.get('grapeFilter')) {
        this.get('grapeService').findAll({}).then((data) => {
            this.set('grapes', data.CepageDescriptionOut);
        });
      }
      if (this.get('colorFilter')) {
          //choose between appellation or cepages
          if (this.get('perspective') == 'appellations') {
            this.get('colorService').distinctColorPerAppellation({}).then((data) => {
                this.set('colors', data.DistinctColorPerAppellationOut);
            });
          }
          if (this.get('perspective') == 'grapes') {
            this.get('colorService').distinctColorPerGrape({}).then((data) => {
                this.set('colors', data.DistinctColorPerGrapeOut);
            });
          }
      }

    },
    actions : {
        addFilter(event) {

        },
        sendCountry (countryWebPath) {
            //TUTO-DDAU-bubble-up-component (2-component-parent)
            //TUTO-DDAU-bubble-up-component PITFALL : loop if code (recursive): this.send("sendCountry", countryWebPath);
            this.get('countriesInfo');
            this.sendAction("setCountryFilter", countryWebPath);
        },
        sendGrape (grapeWebPath) {
            this.sendAction("setGrapeFilter", grapeWebPath);
        },
        sendColor (color) {
            this.sendAction("setColorFilter", color);
        },
    }
});
