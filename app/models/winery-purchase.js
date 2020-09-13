import DS from 'ember-data';

import attr from 'ember-data/attr';
import { computed } from '@ember/object';

export default DS.Model.extend({

    winery: attr('string'),
    wineryId: attr('int'),
    wineryWebPath: attr('string'),
    hasWineryLogo: attr('boolean'),

    totalPriceArray: Ember.computed.mapBy('productLines', 'totalPrice'),
    totalPrice: Ember.computed.sum('totalPriceArray'),
    totalPriceDisplay: computed('totalPrice', function() {
        return this.get("totalPrice").toFixed(2);
    }),
    //list of product-lines
    //TODO remove productLines and use winerySalePlaces
    productLines:   DS.hasMany('product-line'),
    winerySalePlaces:   DS.hasMany('winery-saleplace-purchase'),
    
});
