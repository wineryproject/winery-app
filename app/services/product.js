import Ember from 'ember';
import Service from '@ember/service';

import ProductAdapter from '../adapters/product';
import WineryAdapter from '../adapters/winery';
import VintageAdapter from '../adapters/vintage';
import {prepareConservationProcessing} from '../utils/business-utils';
import {prepareProduct, prepareProducts} from '../utils/product-utils';

import _ from 'lodash';

export default Service.extend({
    find(webPath, wineryWebPath) {
        var adapter = ProductAdapter.create();
        return adapter.findByWebPath(webPath, wineryWebPath);
    },
    findById(id) {
        var adapter = ProductAdapter.create();
        return adapter.findById(id);
    },
    findProductItemPriceByEventIdAndWineryId (eventId, wineryId) {
        var adapter = ProductAdapter.create();
        return adapter.findProductItemPriceByEventIdAndWineryId(eventId, wineryId);
    },
    findProductItemPriceByWineryId (wineryId) {
        var adapter = ProductAdapter.create();
        return adapter.findProductItemPriceByWineryId(wineryId);
    },
    findByWineryWebPath(wineryWebPath, params) {
        var adapter = ProductAdapter.create(); 
        var productPromise = adapter.findByWineryWebPath(wineryWebPath)
            .then(function(data) {
                return data.WineryProductItemBadgeOut;
                }
            );

        var wineryAdapter = WineryAdapter.create(); 
        var wineryPromise = wineryAdapter.findByWebpath(wineryWebPath) //TODO convert to findByWeb P ath
            .then(function(data) {
                return data.WineryPublicOut[0];
                }
            );
        var promises = {
            winery : wineryPromise,
            products : productPromise,
        };
        return Ember.RSVP.hash(promises).then(function(data) {
            prepareProducts(data, params);
            return data;
        });
    },

    findOverview(webPath, wineryWebPath) {
        var adapter = ProductAdapter.create(); 
        var productPromise = adapter.findByWebPath(webPath, wineryWebPath)
            .then(function(data) {
                var item = data.WineryProductItemBadgeOut[0];
                //TODO replace with composite webpath
                item.webPath = item.productWebPath;
                return prepareProduct(item);
                }
            );
        var productConservationPromise = adapter.findConservationMethodByProductWebPath(webPath)
            .then(function(data) {
                return prepareProductConservations(data.WineryProductConservationBadgeOut);
                }
            );
        var wineryAdapter = WineryAdapter.create(); 
        var wineryPromise = wineryAdapter.findByWebpath(wineryWebPath) //TODO convert to findByWeb P ath
            .then(function(data) {
                return data.WineryPublicOut[0];
                }
            );
        var vintageAdapter = VintageAdapter.create(); 
        var vintagePromise = vintageAdapter.findByWineryWebPathAndProductWebPath(wineryWebPath, webPath)
            .then(function(data) {
                return data.ProductanditemlistOut;
                }
            );
        var promises = {
            winery : wineryPromise,
            conservationProcessings : productConservationPromise,
            product : productPromise,
            vintages : vintagePromise
        };
        return Ember.RSVP.hash(promises).then(function(data) {
            return data;
        });
   },
});

function prepareProductConservations(data) {
    let conservationProcessings=[];
    if (data.length>0) {
        _.each(data, function(item){
            let conservationProcessing = prepareConservationProcessing(item);
            conservationProcessings.push(conservationProcessing);
        });
    }
    return conservationProcessings;
}
