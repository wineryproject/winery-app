import Ember from 'ember';

import BaseRoute from '../base';

export default BaseRoute.extend({
    queryParams: {
/*
        appellation: {
            refreshModel: true,
            replace: true
        },
        */
        grape: {
            refreshModel: true,
            replace: true
        },           
        sweetness: {
            refreshModel: true,
            replace: true
        },           
        bubbleness: {
            refreshModel: true,
            replace: true
        },           
        color: {
            refreshModel: true,
            replace: true
        },           
        caracteristic: {
            refreshModel: true,
            replace: true
        },           
        order: {
            replace: true
        },           
    },
    wineryService : Ember.inject.service("winery"),
//TODO change with emberData

    model(params) {
        //TUTO simple composite model w/ ember but not ember data
        return this.get('wineryService').wineryDetailsAndProducts(params);
    },
    afterModel(model, transition) {
        let winery = model.winery;
        this.set("titleToken", ['field.winery', winery?winery.domain:'not found']);
        if (winery) {
            this.set("pageDescription", getWineryPageDescription(winery) );
            //TODO use place-country, desc, address, cepages list, product et price
        }

    },
    setupController(controller, models){
        this._super(...arguments);
    },

});

export function getWineryPageDescription(winery) {
    let description = winery.description?'- '+winery.description+' -':'';
    let since = winery.since? ` - depuis ${winery.since} - `:"";
    let isBio = winery.isBio? ' bio ':"";
    let cepages = winery.cepages.length>0? ', Cépages '+winery.cepages.join(", "):"";
    return `${winery.domain} ${since} ${isBio} ${description} ${cepages} (${winery.contact} - ${winery.contactPostCode} ${winery.contactCity})`;
}
