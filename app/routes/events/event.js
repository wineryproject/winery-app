import Ember from 'ember';
import moment from 'moment';
import _ from "lodash"

import BaseRoute from '../base';

export default BaseRoute.extend({
    queryParams: {
        // criteria for winery
        wineryCountry :  {
            refreshModel: true,
            replace: false
        }, 
        wineryRegion :  {
            refreshModel: true,
            replace: false
        }, 
        wineryCepage :  {
            refreshModel: true,
            replace: false
        }, 
        wineryBio :  {
            refreshModel: true,
            replace: false
        }, 

        //criteria for wine product item
        country: {
            refreshModel: true,
            replace: false
        },
        region: {
            refreshModel: true,
            replace: false
        },
        year: {
            refreshModel: true,
            replace: false
        },
        wineryLabel: {
            refreshModel: true,
            replace: false
        },
        productLabel: {
            refreshModel: true,
            replace: false
        },
        //exclusive criteria : ex if RED not WHITE or ROSE
        //binary
        bio: {
            refreshModel: true,
            replace: false
        },
        //within list
        appellation: {
            refreshModel: true,
            replace: false
        },
        grape: {
            refreshModel: true,
            replace: false
        },           
        sweetness: {
            refreshModel: true,
            replace: false
        },           
        bubbleness: {
            refreshModel: true,
            replace: false
        },           
        color: {
            refreshModel: true,
            replace: false
        },           
        caracteristic: {
            refreshModel: true,
            replace: false
        },    

        //ordering
        orderByPrice: {
            refreshModel: true,
            replace: false
        },
        orderByPreOrderPrice: {
            refreshModel: true,
            replace: false
        },
        orderByPreOrderPriceVariation: {
            refreshModel: true,
            replace: false
        },
        orderByPriceVariation: {
            refreshModel: true,
            replace: false
        },
        orderByYear: {
            refreshModel: true,
            replace: false
        },
        orderByCountry: {
            refreshModel: true,
            replace: false
        },
        orderByRegion: {
            refreshModel: true,
            replace: false
        },
        orderByWinery: {
            refreshModel: true,
            replace: false
        },

    },
    eventService : Ember.inject.service("event"),
    model(params) {
        return this.get('eventService').eventDetailsFull(params);
    },
    afterModel(model, transition) {
        let event = model.event;
        let title = event?event.eventName:'not found';//TODO i18n

        this.set("titleToken", ['field.event', title]);
        if (event) {
            this.set("pageDescription", getEventPageDescription(model));
            //TODO use place-country, desc, price, date, nb wineries
        }

    },
    setupController(controller, models){
        this._super(...arguments);
    },
    resetController(controller, isExiting, transition) {
        if (isExiting) {
          // isExiting would be false if only the route's model was changing
          controller.set('wineryCountry', null);
          controller.set('wineryRegion', null);
          controller.set('wineryCepage', null);
          controller.set('wineryBio', null);
        }
      }
});

export function getEventPageDescription(model) {
   // debugger
    let event = model.event;
    let wineryAbstract = model.wineryAbstract;
    if (wineryAbstract) {
        let distinctCountries = wineryAbstract.country;
        var countries = distinctCountries.length>0?', pays : '+_.map(distinctCountries, e => e.name).join(', '):'';
        let distinctRegions = wineryAbstract.region;
        var regions = distinctRegions.length>0?', régions : '+_.map(distinctRegions, e => e.name).join(', '):'';
    }

    let from = moment(event.fromDate).format("DD MMMM YYYY"); //formatDateFr(event.fromDate);
    let to = moment(event.toDate).format("DD MMMM YYYY"); //formatDateFr(event.toDate);
    let description = event.description?'- '+event.description+' -':'';
    return `${event.eventName} ${event.year} ${description} ${countries} ${regions} (${event.venuePostCode} ${event.venueCity} ${event.venueCountryName}), prix ${event.entranceFee} euros, du ${from} au ${to}` ;
}

