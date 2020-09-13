import Ember from 'ember';

import VintageAdapter from '../../adapters/vintage';
import ProductAdapter from '../../adapters/product';
import BaseRoute from '../base';
import { storageFor } from 'ember-local-storage';
import _ from 'lodash';
import { 
    convertProductLinesToWineryProductLines,
    convertEventWinePriceItemToProductLine

 } from '../../utils/purchase-utils';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteHistoryMixin from 'ember-route-history/mixins/routes/route-history';


export default BaseRoute.extend(AuthenticatedRouteMixin, RouteHistoryMixin, {

    authenticationRoute : "/accounts/login",
    routeHistory: Ember.inject.service(),

    wineryService : Ember.inject.service("winery"),
    productService : Ember.inject.service("product"),
    orderService : Ember.inject.service("order"),
    cart : storageFor("cart"),
    user : storageFor("user"),
    model(params) {
        //return this.get('orderService').checkout(this);
        const currentRouteName = this.get('routeHistory.current'); 
        if ("purchase.index" != currentRouteName) {
              this.transitionTo("/purchase");
          }
        let items = this.get("cart.content");
        if (items.length==0) {
            this.transitionTo("/purchase");
        }
        return getInfo(this);
    }
});

function getInfo (that) {
    let model = that.store.createRecord("customer-purchase");
    let userStorage = that.get("user");
    if (userStorage && userStorage.get("login")) {
        let userLogin = userStorage.get("login");
        model.set("customerEmail",userLogin);
    } else {
        model.set("customerEmail","test@test.com");
    }
    let winery = that.store.createRecord("winery");

    winery.set("name", "Sample winery");
    winery.set("contact", "Contact");
    model.set("winery",winery);
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
        model.wineryProductLines = convertProductLinesToWineryProductLines(model.productLines, that);
        return model;
    });

}