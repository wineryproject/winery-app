import DS from 'ember-data';
import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({

    distinctColorPerAppellation : function () {
        return fetchData(baseUrl+'/data/sdd/DistinctColorPerAppellationIn');
    },
    
    distinctColorPerGrape : function () {
        return fetchData(baseUrl+'/data/sdd/DistinctColorPerGrapeIn');
    },

    distinctColorPerProduct : function () {
        return fetchData(baseUrl+'/data/sdd/DistinctColorPerProductIn');
    },

    findAll : function () {
        return fetchData(baseUrl+'/data/sdd/ColorInfoIn');
    },

});
