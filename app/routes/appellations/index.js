import Ember from 'ember';

import BaseRoute from '../base';

import _ from 'lodash';
import {toDisplay,setDisplayCount, convertComposition} from '../../utils/business-utils';
export default BaseRoute.extend({
    //TODO in ts generic

    titleToken: ['field.appellations'],
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
        color: {
            refreshModel: true,
            replace: true
        },
        searchFreeText: {
            replace: true
        },           
    },

    filter: null,
    appellationService : Ember.inject.service("appellation"),
    beforeModel(transition) {
        let queryParams = transition.queryParams;
    },

    model(params) {
        return this.get('appellationService').findAll(params)
            .then(function(data) {
                _.each(data.AppelationBadgeOut, function (item) {
                    convertComposition(item);
                });
                toDisplay(data.AppelationBadgeOut, params.searchFreeText);
                setDisplayCount(data, data.AppelationBadgeOut);           
                return data;   
            })
            .catch(function(error) {
                console.log("error = "+error);
                //reject(error);
            }
        );
        
    },
    setupController(controller, models){
        this._super(...arguments);
    },
    actions : {
        willTransition: function(transition) {
            //console.log('trying to transition');
        }
    }
});
