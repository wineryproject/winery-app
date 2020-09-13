import Ember from 'ember';

import BaseRoute from '../base';

import _ from 'lodash';

import {toDisplayDomain, setDisplayCount, setDisplayWineries, prepareWinery} from '../../utils/business-utils';

export default BaseRoute.extend({
    titleToken: ['nav.wineries'],
    queryParams: {
        country: {
            refreshModel: true,
            replace: true
        },
        region: {
            refreshModel: true,
            replace: true
        },
        place: {
            refreshModel: true,
            replace: true
        },   
        grape: {
            refreshModel: true,
            replace: true
        },
        appellation: {
            refreshModel: true,
            replace: true
        },
        searchFreeText: {
            replace: true
        },           
    },
    wineryService : Ember.inject.service("winery"),
    model(params) {
        return this.get('wineryService').findAll(params)
            .then(function(data) {
                    _.each(data.WineryPublicOut, function(item){
                        prepareWinery(item);
                    });

                    toDisplayDomain(data.WineryPublicOut, params.searchFreeText);
                    setDisplayWineries(data, data.WineryPublicOut);
                    setDisplayCount(data, data.WineryPublicOut);
                    return data;
                }
            )
            .catch(function(error) {
                console.log("error = "+error);
            }
        );
    },        
    setupController(controller, models){
        this._super(...arguments);
    },
});
