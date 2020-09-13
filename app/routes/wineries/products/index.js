import Ember from 'ember';

import BaseRoute from '../../base';

export default BaseRoute.extend({
//TODO remove duplicated code with /winery/show route
    queryParams: {
        grape: {
            refreshModel: true,
            replace: true
        },           
        sweetness: {
            refreshModel: true,
            replace: true
        },           
        bubbleness: {
            refreshModel: true,
            replace: true
        },           
        color: {
            refreshModel: true,
            replace: true
        },           
        caracteristic: {
            refreshModel: true,
            replace: true
        },           
        order: {
            replace: true
        },           
    },

    productService : Ember.inject.service("product"),
    model(params) {
        return this.get('productService').findByWineryWebPath(params.webpath, params)
            .then (data => {
                return data;
          })
            ;//inversed!!
    },
    afterModel(model, transition) {
        this.set("titleToken", ['field.wines', model.winery?model.winery.domain:'not found']);
    },

});
