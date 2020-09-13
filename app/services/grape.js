import Ember from 'ember';
import Service from '@ember/service';

import GrapeAdapter from '../adapters/grape';
import AppellationAdapter from '../adapters/appellation';
import WineryAdapter from '../adapters/winery';
import RegionAdapter from '../adapters/region';
import {prepareRegion} from '../utils/winery-utils';
import {prepareWinery, convertComposition} from '../utils/business-utils';
import {prepareGrape} from '../utils/product-utils';
import {getGrapesInfo} from '../utils/common-utils';

import _ from 'lodash';

export default Service.extend({
    availableGrapesForRegion(regionId) {
        var adapter = GrapeAdapter.create(); 
        return adapter.availableGrapesForRegion(regionId);
    },
    find(grapeName) {
        var adapter = GrapeAdapter.create(); 
        return adapter.find(grapeName);
    },
    findByWebPath(grapeName) {
        var adapter = GrapeAdapter.create(); 
        return adapter.find(grapeName);
    },
    // overview
    findOverview(webPath) {
        var adapter = GrapeAdapter.create(); 
        var grapePromise = adapter.find(webPath)
            .then(function(data) {
                return prepareGrape(data.CepageDescriptionOut[0]);
            }
        );
        var appellationAdapter = AppellationAdapter.create(); 
        var appellationPromise = appellationAdapter.findByGrapeWebPath(webPath)
            .then(function(data) {
                _.each(data.AppelationBadgeOut, function (item) {
                    convertComposition(item);
                });
                return data.AppelationBadgeOut;
            }
        );
        var wineryAdapter = WineryAdapter.create();
        var wineryPromise = wineryAdapter.findByGrapeWebPath(webPath) 
            .then (function(data){
                _.each(data.WineryPublicOut, function (item) {
                    prepareWinery(item);
                });
                return data.WineryPublicOut;
            });
        var regionAdapter = RegionAdapter.create();
        var regionPromise = regionAdapter.findByGrapeWebPath(webPath) 
            .then (function(data){
                _.each(data.RegionBadgeOut, item=>{
                    prepareRegion(item);
                });
                return data.RegionBadgeOut;
            });
        var promises = {
            grape : grapePromise,
            appellations : appellationPromise,
            wineries : wineryPromise,
            regions : regionPromise,
        };
        return Ember.RSVP.hash(promises).then(function(data) {
            return data;
        });
    },
    findAll() {
        var adapter = GrapeAdapter.create(); 
        return adapter.findAll();
    },
    store() {
        getGrapesInfo();
    },
});
