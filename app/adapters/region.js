import DS from 'ember-data';
import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({
    availableRegionsForCountry: function(countryId){
        return fetchData(baseUrl+'/data/sdd/RegionListIn?countryId='+countryId);
    },
    findByCountryWebpath : function(countryWebpath) {
        return fetchData(baseUrl+'/data/sdd/RegionBadgeIn?countryWebPath='+countryWebpath);
    },
    //TODO remove
    findByGradeWebPath : function(gradeWebPath) {
        return fetchData(baseUrl+'/data/sdd/RegionBadgeIn?gradeWebPath='+gradeWebPath);//TODO
    },
    findByGrapeWebPath : function(grapeWebPath) {
        return fetchData(baseUrl+'/data/sdd/RegionBadgeIn?gradeWebPath='+grapeWebPath);//TODO
    },
    find : function(webpath) {
        return fetchData(baseUrl+'/data/sdd/RegionBadgeIn?webPath='+webpath);
    },
    findByName : function(name) {
        return fetchData(baseUrl+'/data/sdd/RegionBadgeIn?name='+name);
    },
});
