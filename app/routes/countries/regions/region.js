import Ember from 'ember';


import BaseRoute from '../../base';

export default BaseRoute.extend({
    regionService: Ember.inject.service("region"),
    model(params) {
        return this.get('regionService').findOverview(params.region_key).then((data) => {//TODO replace by webpath
            return data;
        });
    },
    afterModel(model, transition) {
        this.set("titleToken", ['field.region', model.region.name]);
    },
});
