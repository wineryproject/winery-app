import ProductAdapter from '../adapters/product';
import EventAdapter from '../adapters/event';
import WineryAdapter from '../adapters/winery';
import {prepareWinery, prepareImagesInfo} from '../utils/business-utils';
import {prepareProducts, prepareWineryProducts} from '../utils/product-utils';
import {prepareEvents} from '../utils/business-utils';

import Service from '@ember/service';
import _ from 'lodash';
import { inject } from '@ember/service';
import { hash } from 'rsvp';

export default Service.extend({

    infoService : inject("info"),
    wineryAbstract(entityId) {
        var adapter = WineryAdapter.create(); 
        return adapter.find(entityId);
    },
    findByWebpath(webPath) {
        var adapter = WineryAdapter.create(); 
        return adapter.findByWebpath(webPath);
    },
    findAll(filters) {
        var adapter = WineryAdapter.create(); 
        return adapter.findAll(filters);
    },
    wineryDetailsAndProducts(params) {
        //TODO merge with findByWineryWebPath(wineryWebPath, params) of product service

        var adapter = WineryAdapter.create();
        var wineryPromise = adapter.findByWebpath(params.webpath) //winery_id webpath
        .then(function(data) {
                return data.WineryPublicOut[0];
            }
        );
        var wineryOpeningHours = adapter.findOpeningHoursByWebpath(params.webpath) //winery_id webpath
        .then(function(data) {
                return data.WineryTimetableInfoOut;
            }
        );
        
        var wineryShippingCostPromise = adapter.findShippingCostByWineryWebpath(params.webpath) //winery_id webpath
        .then(function(data) {
                return data.WineryShippingCostOut;
            }
        );

        var eventAdapter = EventAdapter.create();
        var eventPromise = eventAdapter.findByWineryWebpath(params.webpath)
        .then(function(data) {
                return data.ParticipantsForEventOut;
            }
        );        

        var productAdapter = ProductAdapter.create();
        var productPromise = productAdapter.findByWineryWebPath(params.webpath)
        .then(function(data) {
                return data.WineryProductItemBadgeOut;
            }
        );

        var imagesPromise = this.get('infoService').findImagesInfo("winery", params.webpath)
            .then((data) => {//TODO replace by webpath
                return data.ImageInfoOut;
        });

        var productItemPricePromise = productAdapter.findProductItemPriceByWineryWebPath(params.webpath)        
        .then(function(data) {
                return data.WineryWinePriceItemOut;
            }
        );

        //TODO
        /*
        Gmap load  wineries around
        on controller add listener on change
        on click other => move to other winery webpath +-

        gmap on region and lieu-dit
        plus delimitatiton
        */

        var promises = {
            winery : wineryPromise,
            products : productPromise,
            productItemPrices : productItemPricePromise,
            images : imagesPromise,
            openingHours : wineryOpeningHours,
            events : eventPromise,
            shippingCosts : wineryShippingCostPromise,

        };

        return hash(promises).then(function(data) {
            let products = data.products;
            let winery = data.winery;
            //let openingHours = data.openingHours;
            if (winery) {
                //TODO additional reduce price range at winery level, cepage distinct at winery level, pictures as array
                data.winery.priceMin = _.min(_.map(products, 'priceMin'));
                data.winery.priceMax = _.min(_.map(products, 'priceMax'));
                //TODO group in a function common code with index.js
                prepareWinery(data.winery);

                prepareProducts(data, params);

                prepareImagesInfo(data.images);

                prepareWineryProducts(data, params);

                //prepareEvents(data.events);
            }
            return data;
        });
    }

});

