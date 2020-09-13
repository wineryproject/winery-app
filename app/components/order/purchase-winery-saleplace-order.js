// order/purchase-winery-order
import Ember from 'ember';

import { computed } from '@ember/object';

import base from '../../mixins/component-base-mixin';
import Component from '@ember/component';

export default Component.extend(base, {
    tagName : '',
    actions : {
        removeWineryProductItemId (productItemPriceId, priceType, eventId) {
            this.sendAction("remove", productItemPriceId, priceType, eventId)
        }
    }
});
