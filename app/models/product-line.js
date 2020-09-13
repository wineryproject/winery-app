import DS from 'ember-data';

import attr from 'ember-data/attr';
import { computed } from '@ember/object';

export default DS.Model.extend({

    quantity : attr('int'),

    //productItem description
    idComposite : attr('string'),
    productItemPriceId : attr('int'),
    product : attr('string'),
    productYear : attr('int'),
    productFormatId : attr('int'),
    productFormatWebPath : attr('string'),
    productFormat : attr('string'),
    productFormatQuantity : attr('int'),
    productPrice : attr('double'),
    productWebPath : attr('string'),
    wineryWebPath : attr('string'),


    appellationClassificationAcronym : attr('string'),
    appellationClassificationName : attr('string'),
    appellationName : attr('string'),
    appellationWebPath : attr('string'),
    // new field
    hasProductLogo : attr('boolean'),
    hasWineryLogo : attr('boolean'),
    wineryId : attr('int'),
    winery : attr('string'),
    colorName : attr('string'),
    colorRgb : attr('string'),
    robeName : attr('string'),
    robeRgb : attr('string'),

    eventId : attr('int'),
    eventName : attr('string'),
    eventWebPath : attr('string'),
    priceType : attr('string'),

    totalPrice: computed('quantity', 'productPrice', function() {
        let q = this.get("quantity");
        let p = this.get("productPrice");
        let m = q*p;
        return m;
    }),

    totalPriceDisplay: computed('totalPrice', function() {
        let p = this.get("totalPrice");
        return p.toFixed(2);
    }),
     //totalPrice: attr('double'),

    productPriceValidUntil : attr('date'),

});
