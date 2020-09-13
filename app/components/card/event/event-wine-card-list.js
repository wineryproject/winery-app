import Ember from 'ember';

import _ from 'lodash';
import base from '../../../mixins/component-base-mixin';
import { storageFor } from 'ember-local-storage';
import { addInCart, getCompositeId } from '../../../utils/purchase-utils';
import { observer, computed } from '@ember/object';

export default Ember.Component.extend(base, {
    //TODO remove duplicate with vintage-card-item
    tagName : '',
    data : null,
    cart : storageFor("cart"),

    showFilter : true,
    showSorter : true,
    showPricesRow: true,
    showLogo : true,
    showOrigin : true,
    showEventPrice : true,
    showEventPresalePrice : true,
    showWineryPrice : true,
    isEditableEventPrice : false,
    showCustomerQuantity : false,
    isEditableCustomerQuantity : false,

    modal : false,
    modalQuantity : null,
    modalProductItemId : null,
    modalProductId : null,
    modalWineryId : null,
    modalProductWebPath : null,
    modalWineryWebPath : null,
    modalPriceType : null,
    modalEventId : null,
    modalDisplayPrice : null,
    modalCurrencyName : null,
    domainId: null,
    perspective : null,

/* show is computed early so does not work with ember concurrency
    show : Ember.computed('perspective', 'domainId', 'data', 
        function () {
            let perspective = this.get("perspective"); 
            let domainId = this.get("domainId"); 
            let data = this.get("data"); 
            return (perspective == 'event') || (domainId && data.products && data.products[0].wineryId == domainId);
        }
    ),
    */
    disableDecrease : computed('modalQuantity',
        function() {
            let modalQuantity = this.get("modalQuantity");
            let modalQuantityInt =parseInt(modalQuantity);
            return (modalQuantityInt<=1);
    }),
    actions : {
        /*resetProducts () {
            console.log("resetProducts");
        },
        */
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
            addInCart(this, 
                productItemId, 
                quantity, 
                productId, 
                wineryId, 
                productWebPath, 
                wineryWebPath, 
                priceType, 
                eventId, 
                displayPrice, 
                currencyName
            );
        },
        //TODO remove duplicate between event-wine-card-list.toModal and vintage-card-list.toModal
        //TODO MODAL-WITH-OBJECT to refactor
        toModal(
            productItemId, 
            productId, 
            wineryId, 
            productWebPath, 
            wineryWebPath, 
            priceType, 
            eventId, 
            displayPrice, 
            currencyName) {
            let cart = this.get("cart");
            //TODO remove duplicate
            let perspective = this.get("perspective");
            let priceType2 = (perspective=="event" || perspective == "event-winery")?"event-presale": "winery";
            if (eventId) {
                priceType2 = "event-presale";
            } else {
                priceType2 = "winery";
            }
            priceType = priceType?priceType:priceType2;
            let idComposite= getCompositeId(productItemId, priceType, eventId);

            var obj = cart.findBy('idComposite', idComposite);

            //var obj = cart.findBy('id', productItemId);
            let quantity = obj?obj.quantity : 1;
            this.set("modalQuantity", quantity);
            this.set("modalProductItemId", productItemId);
            this.set("modalProductId", productId);
            this.set("modalWineryId", wineryId);
            this.set("modalProductWebPath", productWebPath);
            this.set("modalWineryWebPath", wineryWebPath);
            this.set("modalDisplayPrice", displayPrice);
            this.set("modalCurrencyName", currencyName);
            if (eventId) {
                if (priceType){
                    this.set("modalPriceType", priceType);
                } else {
                    //TODO event vs event-presale
                    this.set("modalPriceType", "event-presale");
                }
            } else {
                this.set("modalPriceType", "winery");
            }

            this.set("modalEventId", eventId);
            this.set('modal', true);
        },
        forwardToEventCardOverview(filter) {
            this.sendAction("setEventWineFilter", filter);
        },
        forwardToEventCardOverviewSorter(filter) {
            this.sendAction("setEventWineFilter", filter);
        },
    }
});
