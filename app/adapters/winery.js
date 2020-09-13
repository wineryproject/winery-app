import DS from 'ember-data';
import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

import {formatFilter} from '../utils/business-utils';

export default BaseAdapter.extend({

    findAll: function(filters){
        return fetchData(baseUrl+'/data/sdd/WineryPublicIn'+formatFilter(filters));
    },

    find: function(id){
        return fetchData(baseUrl+'/data/sdd/WineryPublicIn?wineryId='+id);
    },

    findByWebpath : function(webpath){
        return fetchData(baseUrl+'/data/sdd/WineryPublicIn?webPath='+webpath);
    },

    findOpeningHoursByWebpath : function(webpath){
        return fetchData(baseUrl+'/data/sdd/WineryTimetableInfoIn?wineryWebPath='+webpath);
    },

    findShippingCostByWineryWebpath : function(webpath){
        return fetchData(baseUrl+'/data/sdd/WineryShippingCostIn?wineryWebPath='+webpath);
    },

    findByRegionWebPath : function(regionWebpath) {
        return fetchData(baseUrl+'/data/sdd/WineryPublicIn?regionWebPath='+regionWebpath);
    },

    findByGradeWebPath : function(gradeWebpath) {
        return fetchData(baseUrl+'/data/sdd/WineryPublicIn?cepageWebPath='+gradeWebpath);//TODO in SDD
    },

    findByGrapeWebPath : function(grapeWebpath) {
        return fetchData(baseUrl+'/data/sdd/WineryPublicIn?cepageWebPath='+grapeWebpath);//TODO in SDD
    },

    findByPlaceWebPath : function(placeWebpath) {
        return fetchData(baseUrl+'/data/sdd/WineryPublicIn?lieuDitWebPath='+placeWebpath);//TODO in SDD
    },

    findByAppellationWebPath : function(appellationWebPath) {
        return fetchData(baseUrl+'/data/sdd/WineryPublicIn?appellationWebPath='+appellationWebPath);//TODO in SDD
    },

    findByEventWebPath: function (eventWebPath) {
        return fetchData(baseUrl + '/data/sdd/WineryPublicIn?eventWebPath=' + eventWebPath);
    },

    wineryCountrySummary : function(params) {
        return fetchData(baseUrl+'/data/sdd/WineryCountrySummaryIn');
    },

    wineryRegionSummary : function(params) {
        return fetchData(baseUrl+'/data/sdd/WineryRegionSummaryIn');
    },
});

