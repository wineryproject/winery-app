import DS from 'ember-data';
import {fetchData} from '../utils/common-utils';
import {formatFilter} from '../utils/business-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({

    availableGrapesForRegion: function(regionId){
        return fetchData(baseUrl+'/data/sdd/ProposedCepageForRegionIn?regionId='+regionId);
    },

    find : function(webPath){
        return fetchData(baseUrl+'/data/sdd/CepageDescriptionIn?webPath='+webPath);
    },
    
    findAll: function (filters) {
        return fetchData(baseUrl+'/data/sdd/CepageDescriptionIn'+formatFilter(filters));
    },
    
    findAllWithFilter: function (filter) {
        return fetchData(baseUrl+'/data/sdd/CepageDescriptionIn'+formatFilter(filters));
    },
   
});

