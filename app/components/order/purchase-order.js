import Ember from 'ember';

import base from '../../mixins/component-base-mixin';
import Component from '@ember/component';
import { storageFor } from 'ember-local-storage';

export default Component.extend(base, {
    
    data : null,

    authManager: Ember.inject.service('session'),

    actions : {
        checkout (id) {
            //TODO store cart; gives back id and send to checkout to transition to page
            this.sendAction("checkout", id);
        },
        order (id) {
            this.sendAction("order", id);
        },
        remove (event) {
            this.sendAction("removeAll");
        },
        cancel (event) {
            this.sendAction("cancelOrder");
        },
        removeProductItemId (productItemPriceId, priceType, eventId) {
            this.sendAction("remove", productItemPriceId, priceType, eventId);
        }

    }
});
