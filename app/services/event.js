import Service from '@ember/service';
import _ from 'lodash';
import moment from 'moment';

import EventAdapter from '../adapters/event';
import WineryAdapter from '../adapters/winery';
import ProductAdapter from '../adapters/product';
import PartnerAdapter from '../adapters/partner';
import {filterAndPrepareWineries, prepareEvent, prepareWinery,toDisplayEvent, setDisplayCount, setDisplayEvents} from '../utils/business-utils';
import {prepareEventProducts} from '../utils/product-utils';
import { storageFor } from 'ember-local-storage';

export default Service.extend({
    user : storageFor("user"),
    session: Ember.inject.service(),
    index(params) {
        var adapter = EventAdapter.create();
        var eventAllPromise = adapter.findAll(params) 
            .then(data => {
                    _.forEach (data.EventInfoOut, function(item) {
                        prepareEvent(item);
                    });
                    toDisplayEvent(data.EventInfoOut, params.searchFreeText);
                    setDisplayEvents(data, data.EventInfoOut);
                    setDisplayCount(data, data.EventInfoOut);
                    return data;
                }
            );
        var eventSummaryPromise = adapter.eventSummary(params) 
            .then(data => {
                return data.EventSummaryOut;
            });
        var promises = {
            events : eventAllPromise,
            eventSummary : eventSummaryPromise
        };
        return Ember.RSVP.hash(promises).then(data => {
            return data;
        });
    },
    findByWebpath(webPath) {
        var adapter = EventAdapter.create(); 
        return adapter.findByWebpath(webPath);
    },
    findWineryEventInfo(params) {
        //TODO check in the user info if it is a owner of the winerys
        //if user is connected hasWineryEventOwnership
        let eventWebPath = params.event_webpath;
        params.eventWebPath = eventWebPath;
        let wineryWebPath = params.winery_webpath;
        var adapter = EventAdapter.create();
        //by default no winery event ownership
        var eventAccessPromise = new Promise(function(resolve) {
            resolve(false);
        });
        if (this.get('session.isAuthenticated')) {
            let userStorage = this.get("user");
            let userLogin = "";
            if (userStorage && userStorage.get("login")) {
                userLogin = userStorage.get("login");
            } 
            eventAccessPromise = adapter.hasWineryEventOwnership(wineryWebPath, eventWebPath, userLogin) 
            .then(data => {
                return data.HasWineryEventOwnershipOut[0].hasWineryEventOwnership;
            });
        }
        var eventPromise = adapter.findByWebpath(eventWebPath) 
            .then(data => {
                return data.EventInfoOut[0];
            });
        var wineryAdapter = WineryAdapter.create(); 
        var wineryPromise = wineryAdapter.findByWebpath(wineryWebPath)
            .then(function(data) {
                return data.WineryPublicOut[0];
                }
            );
        //TODO adapt with product_item_price    
        var productAdapter = ProductAdapter.create(); 
        var productPromise = productAdapter.findProductItemPriceByEventWebPathAndWineryWebPath(eventWebPath, wineryWebPath) 
            .then(function(data) {
                return data.EventWinePriceItemOut;
                }
            );
        var promises = {
            event : eventPromise,
            winery : wineryPromise,
            products : productPromise,
            hasWineryEventOwnership : eventAccessPromise,
        };
        return Ember.RSVP.hash(promises).then(data => {
            prepareEvent(data.event);
            prepareWinery(data.winery, params);
            prepareEventProducts(data, params);
            return data;
        });
    },    
    eventDetailsFull(params) {
        let webPath = params.event_webpath;
        params.eventWebPath = webPath;
        var adapter = EventAdapter.create();
        var eventPromise = adapter.findByWebpath(webPath) 
            .then(data => {
                return data.EventInfoOut[0];
            });
        var wineryAdapter = WineryAdapter.create(); 
        var wineryPromise = wineryAdapter.findByEventWebPath(webPath)
            .then(function(data) {
                return data.WineryPublicOut;
                }
            );
        //TODO adapt with product_item_price    
        var productAdapter = ProductAdapter.create(); 
        var productPromise = productAdapter.findProductItemPriceByEventWebPath(webPath) 
            .then(function(data) {
                return data.EventWinePriceItemOut;
                }
            );
        var partnerAdapter = PartnerAdapter.create(); 
        var partnerPromise = partnerAdapter.findByEventWebPath(webPath)
            .then(function(data) {
                return data.PartnersForEventOut;
                }
            );
        var promises = {
            event : eventPromise,
            wineries : wineryPromise,
            products : productPromise,
            partners : partnerPromise,
        };
        return Ember.RSVP.hash(promises).then(data => {
            if (data.event) {
                prepareEvent(data.event);
                filterAndPrepareWineries(data, params);
                prepareEventProducts(data, params);
                data.cal = getEventCalendar(data.event);
            }
            return data;
        });
    },

});

function getEventCalendar(event) {
    var openingHours = event.openingHours;
    if (openingHours) {
        let from = _.min(_.map(openingHours, function(e) {return new Date(e.from)}));
        let to = _.max(_.map(openingHours, function(e) {return new Date(e.to)}));
        return {
            start: from, 
            end: to, 
            title: event.eventName + ' - '+event.year,
            description: event.description,
            location: address(event)
          };
    }
    return {
        start: moment(event.fromDate,'YYYY-MM-DD'),
        end: moment(event.toDate,'YYYY-MM-DD'), 
        title: event.eventName + ' - '+event.year,
        description: event.description,
        location: address(event)
      };
}
// set in address helper
function address(event) {
    return event.venueStreet1 + ' ' + 
    event.venueStreet2 + ' - ' + 
    event.venuePostCode + ' ' + 
    event.venueCity + ' - ' + 
    event.venueCountryName
    ;
}
