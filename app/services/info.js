import Ember from 'ember';

import InfoAdapter from '../adapters/info';

import _ from 'lodash';

const { Service, inject } = Ember;

//const PATH = 'https://winerylabs.com/winyKendoUiApp/data/sdd/ImageAuthorIn';


export default Service.extend({

    findImageInfo(entityId, entityWebPath, displayOrder) {
        var adapter = InfoAdapter.create(); 
        return adapter.findImageInfo(entityId, entityWebPath, displayOrder);
    },

    findImagesInfo(whereEntity, whereEntityWebPath) {
        var adapter = InfoAdapter.create(); 
        return adapter.findImagesInfo(whereEntity, whereEntityWebPath);
    },

    findCountryImagesInfo(whereEntityWebPath) {
        var adapter = InfoAdapter.create();
        var countryImagePromise = adapter.findImagesInfo("country", whereEntityWebPath);
        var countryImageRegionsPromise = adapter.findImagesInfo("country_regions", whereEntityWebPath);
        var promises = {
            country : countryImagePromise,
            countryRegions : countryImageRegionsPromise,
        };
        return Ember.RSVP.hash(promises).then(function(data) {
            return data;
        });
    },


});
