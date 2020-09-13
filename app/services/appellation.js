import Ember from 'ember';

import AppellationAdapter from '../adapters/appellation';
import WineryAdapter from '../adapters/winery';
import PlaceAdapter from '../adapters/place';
import {prepareWineries, prepareConservationProcessing, convertComposition} from '../utils/business-utils';
import {prepareAromas} from '../utils/product-utils';
import Service from '@ember/service';

import _ from 'lodash';

export default Service.extend({
    // abstract all + filter
   findAll(filters) {
      var adapter = AppellationAdapter.create(); 
      return adapter.findAll(filters);
   },
   //abstract autonomous
   find(webPath, language) {
      var adapter = AppellationAdapter.create(); 
      return adapter.find(webPath, language);//TODO replace by find
   },
   // overview
   findOverview(webPath, language) {
        var adapter = AppellationAdapter.create(); 
        var appellationPromise = adapter.find(webPath, language)
            .then(function(data) {
                var item = data.AppelationBadgeOut[0];
                convertComposition(item);
                prepareAromas(item);
                return item;
                }
            );
        var appellationConservationPromise = adapter.findConservationMethodByAppellationWebPath(webPath)
            .then(function(data) {
                return prepareAppelationConservations(data.AppelationConservationBadgeOut);
                }
            );
        var wineryAdapter = WineryAdapter.create();
        var wineryPromise = wineryAdapter.findByAppellationWebPath(webPath) //winery_id webpath
            .then(function(data) {
                return prepareWineries(data.WineryPublicOut);
                }
            );
        
        //var wineryAdapter = WineryAdapter.create();
        //TODO create adapter based on appellation -> wineries
        
        var placeAdapter = PlaceAdapter.create(); 
        var placePromise = placeAdapter.findByAppellationWebPath(webPath)
            .then(function (data) {
                return data.LieuDitBadgeOut;
            });  
              
        var promises = {
            appellation : appellationPromise,
            conservationMethod : appellationConservationPromise,
            places : placePromise,
            wineries : wineryPromise,
        };
        return Ember.RSVP.hash(promises).then(function(data) {
            return data;
        });
   },
   // abstract child (= all + custom filter by parent web path)
   findByRegionWebPath (regionWebPath) {
      var adapter = AppellationAdapter.create();
      return adapter.findByRegionWebPath(regionWebPath);
   },
   findByCountryWebPath (countryWebPath) {
      var adapter = AppellationAdapter.create();
      return adapter.findByCountryWebPath(countryWebPath);
   },
});

function prepareAppelationConservations(data) {
    if (data.length>0) {
        let conservationMethod = {
            countryId:data[0].conservationMethodCountryId,
            description:data[0].conservationMethodDescription,
            durationMax:data[0].conservationMethodDurationMax,
            durationMin:data[0].conservationMethodDurationMin,
            durationUnit:data[0].conservationMethodDurationUnit,
            name:data[0].conservationMethodName,
            conservationProcessings:[]
        };
        _.each(data, function(item){
            let conservationProcessing = prepareConservationProcessing(item);
            conservationMethod.conservationProcessings.push(conservationProcessing);
        });
        return conservationMethod;
    }
}