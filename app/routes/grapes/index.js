import Ember from 'ember';

import BaseRoute from '../base';

import GrapeAdapter from '../../adapters/grape';
import {toDisplay, setDisplayCount} from '../../utils/business-utils';

export default BaseRoute.extend({
    
    titleToken: ['nav.grapes'],

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
        appellation: {
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

    model(params) {
        var adapter = GrapeAdapter.create();
        return adapter.findAll(params)
            .then(function(data) {
                    toDisplay(data.CepageDescriptionOut, params.searchFreeText);
                    setDisplayCount(data, data.CepageDescriptionOut);
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
