import Ember from 'ember';

import { storageFor } from 'ember-local-storage';
import PurchaseAdapter from '../../adapters/purchase';
import { getCompositeId } from '../../utils/purchase-utils';
import {getUserLanguage} from '../../utils/common-utils';

import _ from 'lodash';

export default Ember.Controller.extend({
    
    cart : storageFor("cart"),
    user : storageFor("user"),

    actions : {
        removeInPurchaseController (productItemPriceId, priceType, eventId) {
            let idComposite= getCompositeId(productItemPriceId, priceType, eventId);
            let line = this.get("model.productLines").findBy('id',idComposite);
            let wineryId = line.get("wineryId");
            this.get("model.productLines").removeObject(line);
            let wpl = this.get("model.wineryProductLines").findBy('wineryId',wineryId);
            
            let line2 = wpl.get("productLines").findBy('id', idComposite);
            wpl.get("productLines").removeObject(line2);
            if (wpl.get("productLines").get("length") == 0) {
                this.get("model.wineryProductLines").removeObject(wpl); 
            }
            if (this.get("model.productLines").get("length") == 0) {
                this.set("model.wineryProductLines", []); 
            }
            let obj = this.get('cart').findBy('idComposite', idComposite);
            this.get('cart').removeObject(obj);

        },
        removeAllInPurchaseController () {
            this.get('cart').clear();
            this.set("model.productLines", []);
            this.set("model.wineryProductLines", []);
        },
        checkoutController(id) {
            let cart = this.get("cart");
            let adapter = PurchaseAdapter.create(); 
            let userStorage = this.get("user");
            let email = "";
            if (userStorage && userStorage.get("login")) {
                email = userStorage.get("login");
            } 
            let userLanguage = getUserLanguage();
            adapter.storePurchaseOrder(email, userLanguage, JSON.stringify(cart.content))
                .then (data => {
                    let key = data.StorePurchaseOrderOut[0].key;
                    this.set("cart.poKey", key);
                    this.transitionToRoute('/purchase/checkout');
                });
            
        }

    }
    
});
