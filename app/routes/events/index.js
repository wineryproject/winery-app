import Ember from 'ember';

import BaseRoute from '../base';

export default BaseRoute.extend({
    
    titleToken: ['nav.events'],
    pageDescription : 'Evénements vinicoles belges et français ainsi que les vignobles participant',

    queryParams: {
        country: {
            refreshModel: true,
            replace: true
        },
        region: {
            refreshModel: true,
            replace: true
        },
        searchFreeText: {
            replace: true
        },
        timeline: {
            refreshModel: true,
            replace: true
        },
        orderBy: {
            refreshModel: true,
            replace: true
        },
        fromDateGreaterThan: {
            refreshModel: true,
            replace: true
        },

    },
    eventService : Ember.inject.service("event"),
    model(params) {
        if (!params.timeline) {
            params.timeline = 'CURRENT,FUTURE';
        }
        if (!params.orderBy) {
            params.orderBy = 'from_date_asc';
        }
        
        let model = this.get('eventService').index(params);

        return model;      
    },
    setupController(controller, models){
        this._super(...arguments);
    },
});
