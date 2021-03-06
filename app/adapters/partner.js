import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({
    findByEventWebPath : function(eventWebPath){
        return fetchData(baseUrl+'/data/sdd/PartnersForEventIn?eventWebPath='+eventWebPath);
    }
});
