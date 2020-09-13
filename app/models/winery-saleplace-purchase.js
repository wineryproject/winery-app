import DS from 'ember-data';

export default DS.Model.extend({
    reference: attr('string'),

    saleType : attr('string'),
    shippingCost : attr('string'),

    totalPriceArray: Ember.computed.mapBy('productLines', 'totalPrice'),
    totalPrice: Ember.computed.sum('totalPriceArray'),
    totalPriceDisplay: computed('totalPrice', function() {
        return this.get("totalPrice").toFixed(2);
    }),
    //list of product-lines
    productLines:   DS.hasMany('product-line'),
});
