import DS from 'ember-data';

import attr from 'ember-data/attr';
import { computed } from '@ember/object';

export default DS.Model.extend({

    customerEmail: attr('string'),
    customer : DS.belongsTo('user'),

//https://discuss.emberjs.com/t/ember-computed-sum/9786
    totalPriceArray: Ember.computed.mapBy('productLines', 'totalPrice'),
    totalPrice: Ember.computed.sum('totalPriceArray'),
    totalPriceDisplay: computed('totalPrice', function() {
        return this.get("totalPrice").toFixed(2);
    }),
    //list of product-lines
    productLines:   DS.hasMany('product-line'),

    wineryProductLines:   DS.hasMany('product-line'),
    
});
