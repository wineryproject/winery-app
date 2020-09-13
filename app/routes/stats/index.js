import Ember from 'ember';

import BaseRoute from '../base';

export default BaseRoute.extend({
    //STATS are loaded on demand since each board is a distince query
    // loaded via ember concurrency
    titleToken: ['nav.stats'],
    queryParams: {
        year: {
            refreshModel: true,
            replace: true
        },
        region: {
            refreshModel: true,
            replace: true
        },
        country: {
            refreshModel: true,
            replace: true
        },
        grades: {
            refreshModel: true,
            replace: true
        },
        isWineryBio: {
            refreshModel: true,
            replace: true
        },
        isBioWineryDynamic: {
            refreshModel: true,
            replace: true
        },
        chunkPeriodGranularity: {
            refreshModel: true,
            replace: true
        },
        eventCountryWebPath: {
            refreshModel: true,
            replace: true
        },
    },
	stats : Ember.inject.service("stats"),
	async model(params) {
        if (params.year==null) {
            return this.get('stats').eventsPerYearStat({});
        } else {
            return this.get('stats').statsInfo(params);
        }
    },
    setupController(controller, models){
        this._super(...arguments);
    },
});
