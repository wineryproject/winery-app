import Ember from 'ember';

import _ from 'lodash';
import base from '../../../mixins/component-base-mixin';
import { storageFor } from 'ember-local-storage';
import { getCompositeId } from '../../../utils/purchase-utils';
import { observer, computed } from '@ember/object';

export default Ember.Component.extend(base, {
    //TODO remove duplicate with vintage-card-item
    tagName : '',
    product : null,
    perspective : null,
    cart : storageFor("cart"),
    wineryEventCustomerOrder : storageFor("customer-order"),

    customerQuantity : null,
    customerPriceDisplay : computed(
        'customerQuantity'
        ,'product.eventPrice'
        , function() {
            let quantity = this.get("customerQuantity");
            let eventPrice = this.get("product.eventPrice");
            return (quantity*eventPrice).toFixed(2);
    }),
    priceChange : observer(
        'customerQuantity'
        ,'product.eventPrice'
        , function() {
            let quantity = this.get("customerQuantity");
            let eventPrice = this.get("product.eventPrice");
            let product = this.get("product");
            let co = this.get("wineryEventCustomerOrder");
            createOrUpdateCustomerOrder(co, quantity, eventPrice, product);
    }),
    
    displayPrice : computed('product'
        ,'perspective', 
        function() {
            let perspective =    this.get("perspective");
            let product = this.get("product");
            if (perspective=="event-winery") {
                return product.eventPreOrderPrice;
            } else {
                return product.homePrice;
            }
    }),
    numberInShoppingCart : computed('cart.[]', function() {
        //TODO user idComposite
        let cartContent = this.get("cart.content");
        let perspective = this.get("perspective");
        let productItemPriceId = this.get("product.productItemPriceId");//TODO change by productItemPriceId
        let eventId = this.get("product.eventId");
        let priceType = (perspective=="event" || perspective == "event-winery")?"event-presale": "winery";
        if (eventId) {
            //TODO use product.nbOfDayPresaleBeforeEvent to determine if it is "event" or "event-presale"
            priceType = "event-presale";
        }
        let idComposite= getCompositeId(productItemPriceId, priceType, eventId);
        
        let itemQuantity = _.filter(cartContent, {'idComposite':idComposite});
        if (itemQuantity.length == 0) {
            return 0;
        }
        else { 
            return itemQuantity[0] | itemQuantity[0].quantity;
        }
    }),
    isInShoppingCart : Ember.computed('numberInShoppingCart', function() {
        let numberInShoppingCart = this.get("numberInShoppingCart");
        return numberInShoppingCart > 0;
    }),

    actions : {
         //TODO MODAL-WITH-OBJECT to refactor !! here add event id
        setProductItemPriceId(productItemId, 
            productId, 
            wineryId, 
            productWebPath, 
            wineryWebPath, 
            priceType, 
            eventId,
            displayPrice,
            currencyName
            ) {
                this.sendAction("forwardToModal", 
                    productItemId, 
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
    }
});

function createOrUpdateCustomerOrder(co, quantity, eventPrice, product) {
    let total = (quantity*eventPrice).toFixed(2);
    let id= product.productItemPriceId;
    let objId = co.findBy('id', id);
    co.removeObject(objId);

    let obj = {
        id : id,
        product : product,
        wineryChoosenPrice : eventPrice,
        quantity : quantity,
        total : total,
    }
    co.addObject(obj);
}