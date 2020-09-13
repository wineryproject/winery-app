import Ember from 'ember';

import _ from 'lodash';
import base from '../../../mixins/component-base-mixin';
import { storageFor } from 'ember-local-storage';
import { getCompositeId } from '../../../utils/purchase-utils';

export default Ember.Component.extend(base, {
    tagName : '',
    data : null,
    //TODO add in component-cart-mixin
    cart : storageFor("cart"),
    numberInShoppingCart : Ember.computed('cart.[]', function() {
        let cartContent = this.get("cart.content");
        //let productItemId = this.get("data.productItemId");
        let productItemPriceId = this.get("data.productItemPriceId");
        let idComposite= getCompositeId(productItemPriceId, "winery", null);//vintage-card-item is only used in the context of winery (home)
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
         //TODO MODAL-WITH-OBJECT to refactor
        setProductItemId(productItemId, 
            productId, 
            wineryId, 
            productWebPath, 
            wineryWebPath, 
            modalDisplayPrice,
            modalCurrencyName
            ) {
            this.sendAction("forwardToModal", 
                productItemId, 
                productId, 
                wineryId, 
                productWebPath, 
                wineryWebPath, 
                modalDisplayPrice,
                modalCurrencyName
                );
        },
    }

});
