import Ember from 'ember';

import BaseRoute from '../../base';

export default BaseRoute.extend({
    eventService : Ember.inject.service("event"),
    model(params) {
        return this.get('eventService').findWineryEventInfo(params);
    },
    afterModel(model, transition) {
        let domain = model.winery.domain;
        let event = model.event.eventName + ' ' + model.event.year;
        let title = event + ' - ' + domain;
        this.set("titleToken", ['field.event', title]);
    },
});
