import Ember from 'ember';

import customerModel from '../models/customer-purchase';  
import VintageAdapter from '../adapters/vintage';
import ProductAdapter from '../adapters/product';
import { storageFor } from 'ember-local-storage';
import _ from 'lodash';
import { 
    convertProductLinesToWineryProductLines,  
    convertEventWinePriceItemToProductLine
} from '../utils/purchase-utils'

export default Ember.Service.extend({

    checkout(that) {
        return getInfo(this);
    },
    confirm() {
        return getInfo(this);
    },
    
});

function getInfo (that) {
    let model = that.store.createRecord("customer-purchase");
    model.set("customerEmail",that.get("user.login"));

    let winery = that.store.createRecord("winery");

    winery.set("name", "Sample winery");
    winery.set("contact", "Contact");
    model.set("winery",winery);

    let pl = that.store.createRecord("product-line");

//https://discuss.emberjs.com/t/how-to-make-this-code-a-promise/13210/4
    let promesses = [];
    let items = that.get("cart.content");
    let vintageAdapter = VintageAdapter.create();
    let productAdapter = ProductAdapter.create();
    _.forEach(items, d => {
        let productLine = that.store.createRecord("product-line");
        if (d.eventId) {
            let vintagePromise = productAdapter.findProductItemPriceByEventIdAndProductItemPriceId(d.eventId, d.id)
                .then(function(data) {
                    let pi = data.EventWinePriceItemOut[0];
                    return convertEventWinePriceItemToProductLine (pi, d, productLine);
                }
            );
            promesses.push(vintagePromise); 
        } else {
            let vintagePromise = productAdapter.findProductItemPriceByWineryIdAndProductItemPriceId(d.wineryId, d.id)
                .then(function(data) {
                    let pi = data.WineryWinePriceItemOut[0];
                    return convertEventWinePriceItemToProductLine (pi, d, productLine);
                    //return convertWineryWinePriceItemToProductLine (pi, d, productLine);
                }
            );
            promesses.push(vintagePromise); 
        }
    });

    return Ember.RSVP.hash(promesses).then(function(data) {
        model.productLines = [];
        _.forEach(data, d => {
            model.productLines.push(d);
        });
        model.wineryProductLines = convertProductLinesToWineryProductLines(model.productLines);
        return model;
    });

}

