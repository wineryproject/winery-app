import DS from 'ember-data';
import { fetchData } from '../utils/common-utils';
import BaseAdapter from './base';
import appendQuery from 'npm:append-query';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host + "/" + namespace;

export default BaseAdapter.extend({

    //deprecated
    find: function (webpath) {
        return fetchData(baseUrl + '/data/sdd/WineryProductItemBadgeIn?webPath=' + webpath);
    },
    findById: function (id) {
        return fetchData(baseUrl + '/data/sdd/WineryProductItemBadgeIn?productId=' + id);
    },
    /*
    findByProductItemId: function(productItemId){
        return fetchData(baseUrl+'/data/sdd/WineryProductItemBadgeIn?productItemId='+productItemId);
    },
    */
    findByWebPath : function(webpath, wineryWebPath){
        return fetchData(baseUrl+'/data/sdd/WineryProductItemBadgeIn?webPath='+webpath+"&wineryWebPath="+wineryWebPath);
    },
    findByWineryWebPath: function (wineryWebPath) {
        return fetchData(baseUrl + '/data/sdd/WineryProductItemBadgeIn?wineryWebPath=' + wineryWebPath);
    },
    findByEventWebPath: function (eventWebPath) {
        return fetchData(baseUrl + '/data/sdd/WineryProductItemBadgeIn?eventWebPath=' + eventWebPath);
    },
    findConservationMethodByProductWebPath: function (webPath) {
        return findConservationMethodByProductWebPath({ webPath: webPath });
    },
    findProductItemPriceByEventWebPath : function (eventWebPath) {
        return fetchData(baseUrl + '/data/sdd/EventWinePriceItemIn?eventWebPath=' + eventWebPath);
    },
    //For  list of product event-winery oriented
    findProductItemPriceByEventIdAndWineryId : function (eventId, wineryId) {
        return fetchData(baseUrl + '/data/sdd/EventWinePriceItemIn?eventId=' + eventId+'&wineryId='+wineryId);
    },
    findProductItemPriceByEventWebPathAndWineryWebPath : function (eventWebPath, wineryWebPath) {
        return fetchData(baseUrl + '/data/sdd/EventWinePriceItemIn?eventWebPath=' + eventWebPath+'&wineryWebPath='+wineryWebPath);
    },
    findProductItemPriceByEventIdAndProductItemPriceId : function (eventId, productItemPriceId) {
        return fetchData(baseUrl + '/data/sdd/EventWinePriceItemIn?eventId=' + eventId+'&productItemPriceId='+productItemPriceId);
    },
    //For  list of product winery oriented
    findProductItemPriceByWineryId : function (wineryId) {
        return fetchData(baseUrl + '/data/sdd/WineryWinePriceItemIn?wineryId='+wineryId);
    },
    findProductItemPriceByWineryWebPath : function (webPath) {
        return fetchData(baseUrl + '/data/sdd/WineryWinePriceItemIn?wineryWebPath='+webPath);
    },
    findProductItemPriceByWineryIdAndProductItemPriceId : function (wineryId, productItemPriceId) {
        return fetchData(baseUrl + '/data/sdd/WineryWinePriceItemIn?wineryId='+wineryId+'&productItemPriceId='+productItemPriceId);
    },

});

function findConservationMethodByProductWebPath(filters) {
    return fetchData(baseUrl + '/data/sdd/WineryProductConservationBadgeIn' + formatFilter(filters));//TODO format filters
}

function formatFilter(filters) {
    return appendQuery("", {
        "webPath": filters.webPath
    }, { removeNull: true });
}