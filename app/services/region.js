import Ember from 'ember';
import Service from '@ember/service';
import { hash } from 'rsvp';

import RegionAdapter from '../adapters/region';
import AppellationAdapter from '../adapters/appellation';
import WineryAdapter from '../adapters/winery';
import PlaceAdapter from '../adapters/place';
import {prepareWineries, convertComposition} from '../utils/business-utils';
import {prepareRegion} from '../utils/winery-utils';

import _ from 'lodash';

export default Service.extend({
   availableRegionsForCountry(countryId) {
      var adapter = RegionAdapter.create(); 
      return adapter.availableRegionsForCountry(countryId);
   },
   findByCountryWebpath(countryWebpath) {
      var adapter = RegionAdapter.create(); 
      return adapter.availableRegionsForCountry(countryWebpath);
   },
   find(webPath) {
      var adapter = RegionAdapter.create(); 
      return adapter.find(webPath);//TODO replace by find
   },
   // overview
   findOverview(webPath) {
        var adapter = RegionAdapter.create(); 
      // add promise for child
        var regionPromise = adapter.find(webPath)
            .then(function(data) {
                    return prepareRegion(data.RegionBadgeOut[0]);
                }
            );

        var wineryAdapter = WineryAdapter.create();
        var wineryPromise = wineryAdapter.findByRegionWebPath(webPath)
            .then (data => {
                return prepareWineries(data.WineryPublicOut);
            });    
        var appellationAdapter = AppellationAdapter.create(); 
        var appellationPromise = appellationAdapter.findByRegionWebPath(webPath)
            .then(function (data) {
                  _.each(data.AppelationBadgeOut, function (item) {
                        convertComposition(item);
                  });
                  return data.AppelationBadgeOut;
            });
        var placeAdapter = PlaceAdapter.create(); 
        var placePromise = placeAdapter.findByRegionWebPath(webPath)
            .then(function (data) {
                return data.LieuDitBadgeOut;
            });    
        var promises = {
            region : regionPromise,
            appellations : appellationPromise,
            wineries : wineryPromise,
            places : placePromise
        };
        return hash(promises).then(function(data) {
            return data;
        });
   },
});
