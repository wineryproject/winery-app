import Ember from 'ember';

import BaseRoute from '../base';

export default BaseRoute.extend({

    countryService : Ember.inject.service("country"),
    model(params) {
        return this.get('countryService').findOverview(params.webpath);
    },
    afterModel(model, transition) {
        this.set("titleToken", ['field.country', model.country.name]);
    },
});
