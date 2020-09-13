import Ember from 'ember';

import BaseRoute from '../base';

export default BaseRoute.extend({
    grapeService : Ember.inject.service("grape"),
    model(params) {
        return this.get('grapeService').findOverview(params.grape_key);
    },
    afterModel(model, transition) {
        this.set("titleToken", ['field.country', model.grape.name]);
    },
});
