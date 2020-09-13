import Ember from 'ember';
import { storageFor } from 'ember-local-storage';
import { observer } from '@ember/object';
import { addInCart, getCompositeId } from '../../utils/purchase-utils';

import base from '../../mixins/component-base-mixin';
import Component from '@ember/component';

export default Component.extend(base, {
    tagName : '',

    model : null,
    data : null,
    quantity : null,
    cart : storageFor("cart"),

    quantityChanged: observer('data.quantity', function() {
        //TODO use idComposite
        let quantity = this.get("data.quantity");
        let productItemPriceId = this.get("data.productItemPriceId");
        let eventId = this.get("data.eventId");
        let priceType = this.get("data.priceType");
        let idComposite= getCompositeId(productItemPriceId, priceType, eventId);
        let cart = this.get("cart");
        var obj = cart.findBy('idComposite', idComposite);
        let wineryId = obj.wineryId;
        let productId = obj.productId;
        let productWebPath = obj.productWebPath;
        let wineryWebPath = obj.wineryWebPath;
//        let priceType = obj.priceType;
//        let eventId = obj.eventId;
        addInCart(this, productItemPriceId, quantity, productId, wineryId, productWebPath, wineryWebPath, priceType, eventId);
    }),  

    actions : {
        remove (productItemPriceId, priceType, eventId) {
            this.sendAction("remove", productItemPriceId, priceType, eventId);
        }
    }
    
});
