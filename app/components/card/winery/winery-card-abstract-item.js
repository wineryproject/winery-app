import Ember from 'ember';
import {prepareWinery} from '../../../utils/business-utils';
import { storageFor } from 'ember-local-storage';
import _ from 'lodash';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
    tagName:'',
    //TODO use typescript + generic to remove redundancy with region and other 'route entities' on autonomous mode
    autonomous : null,
    //winery : null,
    data : null,
    wineryWebPath : null,

    perspectiveEntityId : null,
    productList : {products:null},
    product2 : null,
    hasProduct : Ember.computed('product2','productList','wineryWebPath', function() {
        let productList = this.get("productList");
        let pL = this.get("product2");
        let productListData = productList.data;
        let data = this.get("data");
        if (pL && 
            pL.length>0 && 
            pL[0].wineryWebPath == data.webPath)
            return true;
        return false;
    }),
    wineryId : Ember.computed('product2', function() {
        let pL = this.get("product2");
        if (pL && 
            pL.length>0 )
            return pL[0].wineryId;
        return 0;
    }),


    //TODO add in mixin component-cart-mixin
    cart : storageFor("cart"),
    nbOfItemsInCart : Ember.computed('cart.[]', function() {
        let cartContent = this.get("cart.content");
        if (cartContent.length==0) {
            return 0;
        }
        
        let autonomous = this.get("autonomous");
        if (autonomous) {
            let wineryWebPath = this.get("wineryWebPath");
            //instead of idComposite
            let itemQuantity = _.filter(cartContent, {'wineryWebPath':wineryWebPath, 'priceType':'winery'});
           return itemQuantity.length;

        } else {
            let entityId = this.get("data.domainId");
            let itemQuantity = _.filter(cartContent, {'wineryId':entityId, 'priceType':'winery'});
            return itemQuantity.length;
        }
        
    }),
    hasShoppingCart : Ember.computed('nbOfItemsInCart', function() {
        return this.get("nbOfItemsInCart") > 0;
    }),
     //TODO add in mixin component-cart-mixin end

    wineryService: Ember.inject.service("winery"),
    productService: Ember.inject.service("product"),
    didInsertElement() {
      this._super(...arguments);
      if (this.get('autonomous') && this.get('wineryWebPath')) {
        this.get('wineryService').findByWebpath(this.get("wineryWebPath")).then((data) => {//TODO replace by webpath
            let winery = data.WineryPublicOut[0];
            //TODO choose convention between generic data object and custom business : winery object
            //this.set('winery', winery);
            this.set('data', prepareWinery(winery));
            //TODO cepage conversion, region -> country perspective, appellation
        });
      }
    },
    findEventProducts : task(function * () {
        let productService = this.get("productService");
        let wineryId = this.get("data.id");
        let eventId = this.get("perspectiveEntityId");
        let productList = yield productService.findProductItemPriceByEventIdAndWineryId(eventId,wineryId);
        this.set('product2', productList.EventWinePriceItemOut);
        this.set('productList.products', productList.EventWinePriceItemOut);
    }),
    findProducts : task(function * () {
        let productService = this.get("productService");
        let wineryId = this.get("data.id");
        let productList = yield productService.findProductItemPriceByWineryId(wineryId);
        this.set('productList.products', productList.WineryWinePriceItemOut);
    }),
});
