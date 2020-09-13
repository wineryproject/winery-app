import Ember from 'ember';

import BaseRoute from '../../base';

import _ from 'lodash';

export default BaseRoute.extend({
    wineryService : Ember.inject.service("winery"),
    productService : Ember.inject.service("product"),
    model(params) {
        //webpath, product_key
        //var data = this.get('wineryService').wineryDetailsAndProducts(params);
        var data = this.get('productService').findOverview(params.product_key, params.webpath);//inversed!!
        return data;
    },
    afterModel(model, transition) {
        this.set("titleToken", ['field.wine', model.product.product]);
    },
});
