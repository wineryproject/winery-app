import Ember from 'ember';


import BaseRoute from './base';

import EventAdapter from '../adapters/event';
import WineryAdapter from '../adapters/winery';

export default BaseRoute.extend({

    model(params) {
        var eA = EventAdapter.create();
        var wA = WineryAdapter.create();

        var eventSummaryPromise = eA.eventSummary(params) 
            .then(data => {
                return data.EventSummaryOut;
            });

        var wineryCountrySummaryPromise = wA.wineryCountrySummary(params) 
            .then(data => {
                return data.WineryCountrySummaryOut;
            });

        var wineryRegionSummaryPromise = wA.wineryRegionSummary(params) 
            .then(data => {                
                return data.WineryRegionSummaryOut;
            });
        var promises = {
            wineryCountrySummary : wineryCountrySummaryPromise,
            wineryRegionSummary : wineryRegionSummaryPromise,
            eventSummary : eventSummaryPromise,
        };
        return Ember.RSVP.hash(promises).then(data => {
            return data;
        });
    }
});
