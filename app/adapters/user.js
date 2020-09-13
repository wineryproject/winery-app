import DS from 'ember-data';

import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin'; 
import {fetchData, fetchDataJwt} from '../utils/common-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend(DataAdapterMixin, {

    authorizer: 'authorizer:custom',
    fetch(email) {
        return fetchDataJwt(baseUrl+'/data/sdd/UserInfoIn?email='+email);
    },

    fetchCurrentPurchaseOrder(email) {
        return fetchDataJwt(baseUrl+'/data/sdd/UserPurchaseOrderIn?email='+email);
    }

});
