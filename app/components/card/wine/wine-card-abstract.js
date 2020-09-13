import Ember from 'ember';
import {prepareProduct} from '../../../utils/product-utils';
import { storageFor } from 'ember-local-storage';
import _ from 'lodash';

export default Ember.Component.extend({
    tagName:'',
    //TODO use typescript + generic to remove redundancy with region and other 'route entities' on autonomous mode
    autonomous : null,
    //data : null,
    product : null,
    productWebPath : null, //may hold duplicated or store a combo ref
    wineryWebPath : null, //may hold duplicated or store a combo ref
    id : null,

    cart : storageFor("cart"),
    nbOfItemsInCart : Ember.computed('cart.[]', function() {
        let cartContent = this.get("cart.content");
        if (cartContent.length==0) {
            return 0;
        }
        let productWebPath = this.get("productWebPath");
        let product = this.get("product");
        let productWebPath2 = product?this.get("product").productWebPath:null;
        let pwp = productWebPath?productWebPath:productWebPath2;
        if (pwp) {
            let itemQuantity = _.filter(cartContent, {'productWebPath':pwp, 'priceType':'winery'});
           return itemQuantity.length;
        }
        
    }),
    hasShoppingCart : Ember.computed('nbOfItemsInCart', function() {
        return this.get("nbOfItemsInCart") > 0;
    }),
    //TODO add in mixin component-cart-mixin end
    
    productService: Ember.inject.service("product"),

    didInsertElement() {
      this._super(...arguments);
      if (this.get('autonomous')) {
        if (this.get('productWebPath') && this.get('wineryWebPath')) {
          this.get('productService').find(this.get("productWebPath"), this.get('wineryWebPath')).then((data) => {//TODO replace by webpath
              let product = data.WineryProductItemBadgeOut[0];
              this.set('product', prepareProduct(product));
          });
        } else if (this.get('id')) {
          this.get('productService').findById(this.get("id")).then((data) => {//TODO replace by webpath
              let product = data.WineryProductItemBadgeOut[0];
              this.set('product', prepareProduct(product));
          });
        }
      }
    }
});
