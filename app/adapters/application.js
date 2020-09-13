import DS from 'ember-data';

import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({
    get : function() {
        return fetchData(baseUrl+'/data/winy/applicationinfo');
    },
});
