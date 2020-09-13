import DS from 'ember-data';
import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({

//TODO REMOVE
    findByWineryWebPathAndProductWebPath : function(wineryWebPath, productWebPath) {
        return fetchData(baseUrl+'/data/sdd/ProductanditemlistIn?wineryWebPath='+wineryWebPath+'&productWebPath='+productWebPath);//TODO format filters
    },

//TODO REMOVE replace by product adapter :
//findProductItemPriceByWineryIdAndProductItemPriceId for home price
//findProductItemPriceByEventIdAndProductItemPriceId for event price
    findByProductItemId: function (productItemId) {
        return fetchData(baseUrl + '/data/sdd/ProductanditemlistIn?productItemPriceId=' + productItemId);
    },
});
