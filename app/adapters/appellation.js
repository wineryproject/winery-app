import DS from 'ember-data';
import {formatFilter} from '../utils/business-utils';

import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({

    //abstract autonomous + overview
    find : function(webpath, language) {
        let filters = {webpath: webpath, language: language};
        return fetchData(baseUrl+'/data/sdd/AppelationBadgeIn'+formatFilter(filters));
    },
    // abstract all + filter
    findAll : function(filters) {
        return fetchData(baseUrl+'/data/sdd/AppelationBadgeIn'+formatFilter(filters));//TODO format filters
    },
    // abstract child (= all + custom filter by parent web path)
    findByRegionWebPath : function(regionWebPath) {
        return fetchData(baseUrl+'/data/sdd/AppelationBadgeIn?regionWebPath='+regionWebPath);//TODO format filters
    },
    findByCountryWebPath : function(countryWebPath) {
        return fetchData(baseUrl+'/data/sdd/AppelationBadgeIn?countryWebPath='+countryWebPath);//TODO format filters
    },
    findByGradeWebPath : function(gradeWebPath) {
        return findByFilter({grade : gradeWebPath});
    },
    findByGrapeWebPath : function(grapeWebPath) {
        return findByFilter({grape : grapeWebPath});//TODO replace grade by grape in both place
    },
    findByPlaceWebPath : function(placeWebpath) {
        return findByFilter({place : placeWebpath});
    },
    findConservationMethodByAppellationWebPath : function(appellationWebpath) {
        return findConservationMethodByAppellationWebPath({appellationWebPath : appellationWebpath});
    },
});

function findByFilter(filters) {
    return fetchData(baseUrl+'/data/sdd/AppelationBadgeIn'+formatFilter(filters));//TODO format filters
}

function findConservationMethodByAppellationWebPath(filters) {
    return fetchData(baseUrl+'/data/sdd/AppelationConservationBadgeIn'+formatFilter(filters));//TODO format filters
}
