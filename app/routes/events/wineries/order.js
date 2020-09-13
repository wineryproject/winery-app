import Ember from 'ember';

import BaseRoute from '../../base';

export default BaseRoute.extend({
    eventService : Ember.inject.service("event"),
    //TODO check how to keep the same model between pages
    model(params) {
        return this.get('eventService').findWineryEventInfo(params);
    },
    afterModel(model, transition) {
        let title = model.winery.domain;
        this.set("titleToken", ['field.winery', title, 'field.order']);
    },
});
