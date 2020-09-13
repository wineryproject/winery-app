import Ember from 'ember';

import BaseRoute from '../../../base';

export default BaseRoute.extend({
    placeService: Ember.inject.service("place"),
    model(params) {
        return this.get('placeService').findOverview(params.place_key);
    },
    afterModel(model, transition) {
        this.set("titleToken", ['field.place', model.place.name]);
    },
});
