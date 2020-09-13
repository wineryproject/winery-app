import Ember from 'ember';

import BaseRoute from '../base';
import {toDisplay, setDisplayCount} from '../../utils/business-utils';

export default BaseRoute.extend({
    
    titleToken: ['nav.countries'],
    countryService : Ember.inject.service("country"),
    queryParams: {
        grape: {
            refreshModel: true,
            replace: true
        },
        searchFreeText: {
            replace: true
        },           
    },

    allCountries : null,

    model(params) {
        return this.get('countryService').findAllWithInfo(params)
            .then(function(data) {
                    toDisplay(data.CountryDescriptionWithInfoOut, params.searchFreeText);
                    setDisplayCount(data, data.CountryDescriptionWithInfoOut);
                    return data;
                }
            )
            .catch(function(error) {
                console.log("error = "+error);
            }
        );
    },
 
});
