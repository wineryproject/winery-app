import Ember from 'ember';

import CountryAdapter from '../adapters/country';
import AppellationAdapter from '../adapters/appellation';
import RegionAdapter from '../adapters/region';
import Service from '@ember/service';
import {convertComposition} from '../utils/business-utils';
import {getCountriesInfo} from '../utils/common-utils';
import {prepareRegion} from '../utils/winery-utils';
import { hash } from 'rsvp';
import _ from 'lodash';

export default Service.extend({
    availableCountries () {
        var adapter = CountryAdapter.create(); 
        return adapter.availableCountries();
    },
    findAll () {
        var adapter = CountryAdapter.create(); 
        return adapter.findAll();
    },
    find (webpath) {
        var adapter = CountryAdapter.create(); 
        return adapter.find(webpath);
    },
    findWithInfo (entityId, entityWebPath, displayOrder) {
        var adapter = CountryAdapter.create(); 
        return adapter.findWithInfo(entityId, entityWebPath, displayOrder, null);
    },
    findAllWithInfo (filters) {
        var adapter = CountryAdapter.create(); 
        return adapter.findWithInfo(null, null, 1, filters);
    },

    findOverview (webpath) {
        var adapter = CountryAdapter.create();
        var countryPromise = adapter.findWithInfo(null, webpath, 1) //country webpath
            .then(function(data) {
                return data.CountryDescriptionWithInfoOut[0];
                }
            );

        //var regionService = RegionService.create();
        var regionAdapter = RegionAdapter.create();
        var regionPromise = regionAdapter.findByCountryWebpath(webpath)
            .then(function(data) {
                _.each(data.RegionBadgeOut, function (region) {
                    prepareRegion(region);
                });
                return data.RegionBadgeOut;
                }
            );
        var appellationAdapter = AppellationAdapter.create(); 
        var appellationPromise = appellationAdapter.findByCountryWebPath(webpath)
            .then(function (data) {
                //duplicate with route/appellation/index.js
                    _.each(data.AppelationBadgeOut, function (item) {
                        convertComposition(item);
                    });
                    
                    return data.AppelationBadgeOut;
            });
        var promises = {
            country : countryPromise,
            regions : regionPromise,
            appellations : appellationPromise
        };

        return hash(promises).then(function(data) {
            //TODO duplicate code with country service
            _.each(data.regions, function(item){
                //TODO group in a function common code with show.js
                item.cepages = item.cepageNames?item.cepageNames.split(','):[]; //TODO replace by cepageNames
            });
            return data;
        });
    },

    store() {
        getCountriesInfo();
    },

});
