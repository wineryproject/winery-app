import Ember from 'ember';
import Service from '@ember/service';
import { hash } from 'rsvp';

import PlaceAdapter from '../adapters/place';
import AppellationAdapter from '../adapters/appellation';
import WineryAdapter from '../adapters/winery';
import {prepareWineries, convertComposition} from '../utils/business-utils';

import _ from 'lodash';

export default Service.extend({
    find(webPath) {
        var adapter = PlaceAdapter.create();
        return adapter.find(webPath);
    },
    availableLieuDitsForRegion (regionId) {
        var adapter = PlaceAdapter.create();
        return adapter.availableLieuDitsForRegion(regionId);
    },
    findOverview(webPath) {
        var adapter = PlaceAdapter.create();
        var placePromise = adapter.find(webPath)
            .then(data=> {
                return data.LieuDitBadgeOut[0];
            })
        var wineryAdapter = WineryAdapter.create();
        var wineryPromise = wineryAdapter.findByPlaceWebPath(webPath)
            .then (data => {
                return prepareWineries(data.WineryPublicOut);
            });    
        var appellationAdapter = AppellationAdapter.create(); 
        var appellationPromise = appellationAdapter.findByPlaceWebPath(webPath)
            .then(function (data) {
                //duplicate with route/appellation/index.js
                  _.each(data.AppelationBadgeOut, function (item) {
                      convertComposition(item);
                    });
                    
                    return data.AppelationBadgeOut;
            });
        var promises = {
            place : placePromise,
            appellations : appellationPromise,
            wineries : wineryPromise,
        };
        return hash(promises).then(function(data) {
            return data;
        });
    },
});
