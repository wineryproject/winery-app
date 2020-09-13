import Ember from 'ember';

import customerModel from '../../models/customer-purchase';  
import VintageAdapter from '../../adapters/vintage';
import ProductAdapter from '../../adapters/product';
import UserAdapter from '../../adapters/user';
import BaseRoute from '../base';
import { storageFor } from 'ember-local-storage';
import _ from 'lodash';
import { 
    convertProductLinesToWineryProductLines,
    convertEventWinePriceItemToProductLine
 } from '../../utils/purchase-utils';
 import RouteHistoryMixin from 'ember-route-history/mixins/routes/route-history';

export default BaseRoute.extend(RouteHistoryMixin, {

    wineryService : Ember.inject.service("winery"),
    productService : Ember.inject.service("product"),
    orderService : Ember.inject.service("order"),
    userService : Ember.inject.service("user"),
    cart : storageFor("cart"),
    user : storageFor("user"),
    model(params) {
        return getInfo(this);
    },
    setupController(controller, models){
        this._super(...arguments);
    },
    afterModel(model, transition) {
        this.set("titleToken", ['field.purchase-order']);
    },
});

function getInfo (that) {
    let promesses = [];
    let model = that.store.createRecord("customer-purchase");
    //userinfo from backend
    let userStorage = that.get("user");
    if (userStorage && userStorage.get("login")) {
        let userLogin = userStorage.get("login");
        let userPromise = that.get('userService').fetch(userLogin)
            .then(data => {
                return data.UserInfoOut[0];
            })
        ;
        //promesses.push(userPromise); 
    }
//https://discuss.emberjs.com/t/how-to-make-this-code-a-promise/13210/4
    
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
        model.wineryProductLines = convertProductLinesToWineryProductLines(model.productLines, that);
        return model;
    });

}