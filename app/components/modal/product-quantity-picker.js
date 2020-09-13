import Ember from 'ember';
import base from '../../mixins/component-base-mixin';
import { storageFor } from 'ember-local-storage';
import { addInCart, getCompositeId } from '../../utils/purchase-utils';

import _ from 'lodash';

export default Ember.Component.extend(base, {
    tagName : '',
    cart : storageFor("cart"),
    modal : false,
    modalQuantity : null,
    modalProductItemId : null,
    modalProductId : null,
    modalWineryId : null,
    modalProductWebPath : null,
    modalWineryWebPath : null,
    modalDisplayPrice : null,
    modalCurrencyName : null,
    disableDecrease : 
    Ember.computed('modalQuantity',
        function() {
            let modalQuantity = this.get("modalQuantity");
            let modalQuantityInt =parseInt(modalQuantity);
            return (modalQuantityInt<=1);
    }),
    actions : {
        //TODO MODAL-WITH-OBJECT to refactor
        submit() {
//            https://www.codeproject.com/Tips/1213638/%2FTips%2F1213638%2FProgrammatically-Creating-Modals-in-Ember-js
            this.set('modal', false);
            let quantity = this.get("modalQuantity");
            let productItemId = this.get("modalProductItemId");
            let wineryId = this.get("modalWineryId");
            let productId = this.get("modalProductId");
            let productWebPath = this.get("modalProductWebPath");
            let wineryWebPath = this.get("modalWineryWebPath");
            let priceType = this.get("modalPriceType");
            let eventId = this.get("modalEventId");
            let displayPrice = this.get("modalDisplayPrice");
            let currencyName = this.get("modalCurrencyName");
            addInCart(this, productItemId, quantity, productId, wineryId, productWebPath, wineryWebPath, priceType, eventId, displayPrice, currencyName);
        },
        //TODO MODAL-WITH-OBJECT to refactor
        toModal(productItemId, productId, wineryId, productWebPath, wineryWebPath, displayPrice, currencyName) {
            let cart = this.get("cart");
            let id = this.get("modalProductItemId");
            let priceType = this.get("modalPriceType");
            let eventId = this.get("modalEventId");
            let idComposite= getCompositeId(id, priceType, eventId);
            var obj = cart.findBy('idComposite', idComposite);
            
            let quantity = obj?obj.quantity : 1;
            this.set("modalQuantity", quantity);
            this.set("modalProductItemId", productItemId);
            this.set("modalProductId", productId);
            this.set("modalWineryId", wineryId);
            this.set("modalProductWebPath", productWebPath);
            this.set("modalWineryWebPath", wineryWebPath);
            this.set("modalDisplayPrice", displayPrice);
            this.set("modalCurrencyName", currencyName);
            this.set('modal', true);
        },
        delete() {
            let id = this.get("modalProductItemId");
            let priceType = this.get("modalPriceType");
            let eventId = this.get("modalEventId");
            let idComposite= getCompositeId(id, priceType, eventId);
            let cart = this.get("cart");
            var obj = cart.findBy('idComposite', idComposite);
            //var obj = cart.findBy('id', id);
            //cart.removeObject(obj);
            cart.removeObject(obj);
            this.set('modal', false);
        },
        //https://bootsnipp.com/snippets/Max59
        increaseQuantity() {
            let modalQuantity = this.get("modalQuantity");
            let newVal = parseInt(modalQuantity) + 1;
            this.set("modalQuantity", newVal);
        },
        decreaseQuantity() {
            let modalQuantity = this.get("modalQuantity");
            let modalQuantityInt =parseInt(modalQuantity);
            if (modalQuantityInt>1) {
                let newVal = parseInt(modalQuantity) - 1;
                this.set("modalQuantity", newVal);
            } 

        },
        setTo(number) {
            this.set("modalQuantity", number);
        },
        open() {
        },
        save() {
        }
    }
});
