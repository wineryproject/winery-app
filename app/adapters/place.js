import DS from 'ember-data';
import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({
    find: function(webpath){
        return fetchData(baseUrl+'/data/sdd/LieuDitBadgeIn?webPath='+webpath);
    },
    findByRegionWebPath : function(regionWebPath){
        return fetchData(baseUrl+'/data/sdd/LieuDitBadgeIn?regionWebPath='+regionWebPath);
    },
    findByCountryWebPath : function(countryWebPath){
        return fetchData(baseUrl+'/data/sdd/LieuDitBadgeIn?countryWebPath='+countryWebPath);
    },
    findByAppellationWebPath : function(appellationWebPath){
        return fetchData(baseUrl+'/data/sdd/LieuDitBadgeIn?appellationWebPath='+appellationWebPath);
    },
    availableLieuDitsForRegion: function(regionId){
        return fetchData(baseUrl+'/data/sdd/LieuDitListIn?regionId='+regionId);
    },
});
