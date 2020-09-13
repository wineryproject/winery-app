import DS from 'ember-data';

import fetch from 'fetch';
import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

import appendQuery from 'npm:append-query';

export default BaseAdapter.extend({
    
    availableCountries: function(){
        return fetchData(baseUrl+'/data/sdd/CountryListIn');
    },

    findAll: function(){
        return fetchData(baseUrl+'/data/sdd/CountryDescriptionIn');
    },

    find: function(country_key){
        return fetchData(baseUrl+'/data/sdd/CountryDescriptionIn?webPath='+country_key);
    },

    findWithInfo: function(entityId, entityWebPath, displayOrder, filters){
        return fetchData(baseUrl+'/data/sdd/CountryDescriptionWithInfoIn'+filter(entityId, entityWebPath, displayOrder, filters));
    },

    findStateByCountryWebPath: function(countryWebPath){
        return fetchData(baseUrl+'/data/sdd/StateWithInfoIn'+filter('','','',{countryWebPath: countryWebPath}));
    },
});


function filter(entityId, entityWebPath, displayOrder, filters) {
    if (filters) {
        return appendQuery("",{
            "entityId":entityId, 
            "webPath":entityWebPath, 
            "displayOrder":displayOrder, 
            "cepageWebPath":filters.grape,
            "countryWebPath":filter.countryWebPath,
        }, { removeNull: true });
    } else {
        return appendQuery("",{
            "entityId":entityId, 
            "webPath":entityWebPath, 
            "displayOrder":displayOrder
        }, { removeNull: true });
    
    }

}


/*
function updateQueryStringParameter(uri, key, value) {
    uri = uri?uri:'';
    if (value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }
  }
*/