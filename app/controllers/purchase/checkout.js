import Ember from 'ember';

import {notifySuccess, notifyFailure} from '../../utils/notification-utils';
import { storageFor } from 'ember-local-storage';
import {getUserLanguage} from '../../utils/common-utils';

import PurchaseAdapter from '../../adapters/purchase';

import _ from 'lodash';

export default Ember.Controller.extend({

    cart : storageFor("cart"),
    user : storageFor("user"),
    actions : {
        cancelOrderController(id) {
            this.transitionToRoute('/purchase');
        },
        orderController(id) {
            let cart = this.get("cart");
            let adapter = PurchaseAdapter.create(); 
            let userStorage = this.get("user");
            let email = "";//"test@testme.com"
            if (userStorage && userStorage.get("login")) {
                email = userStorage.get("login");
            } else {
                //TODO redirect to login
                this.transitionToRoute("/login"); //TODO inverse logic : if not logged the login and after simple-auth redirects perform purchase-order
            }
            let userLanguage = getUserLanguage();
            adapter.confirmPurchaseOrder(email, userLanguage, getPoKeyFromCart(cart), cartAsJson(cart))
                .then (data => {
                    notifySuccess(this, "notification.purchase-order-submitted");
                    //empty cart
                    this.get("cart").clear();
                    this.transitionToRoute("/purchase/overview");
                });
            
        }

    }
});

function cartAsJson(cart) {
    return JSON.stringify(cart.content);
}

function getPoKeyFromCart(cart) {
    return cart.poKey;
}