import Ember from 'ember';
import base from '../../../mixins/component-base-mixin';
import { storageFor } from 'ember-local-storage';
import { getCompositeId } from '../../../utils/purchase-utils';

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
    perspective : null,
    disableDecrease : 
    Ember.computed('modalQuantity',
        function() {
            let modalQuantity = this.get("modalQuantity");
            let modalQuantityInt =parseInt(modalQuantity);
            return (modalQuantityInt<=1);
    }),
    /**/
    actions : {
        //TODO MODAL-WITH-OBJECT to refactor
        toModal(productItemId, 
            productId, 
            wineryId, 
            productWebPath, 
            wineryWebPath, 
            modalDisplayPrice,
            modalCurrencyName) {
            let cart = this.get("cart");
            //TODO remove duplicate
            let idComposite= getCompositeId(productItemId, "winery");

            var obj = cart.findBy('idComposite', idComposite);
            //var obj = cart.findBy('id', productItemId);
            let quantity = obj?obj.quantity : 1;
            this.set("modalQuantity", quantity);
            this.set("modalProductItemId", productItemId);
            this.set("modalProductId", productId);
            this.set("modalWineryId", wineryId);
            this.set("modalProductWebPath", productWebPath);
            this.set("modalWineryWebPath", wineryWebPath);
            this.set("modalPriceType", "winery");
            this.set("modalDisplayPrice", modalDisplayPrice);
            this.set("modalCurrencyName", modalCurrencyName);
            this.set('modal', true);
        },

    }
});
