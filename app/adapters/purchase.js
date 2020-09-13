import DS from 'ember-data';

import {fetchData, postData} from '../utils/common-utils';

import BaseAdapter from './base';
import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({

//TODO protect with jwt
    storePurchaseOrder : function (login, languageCode, json) {
        return $.post(baseUrl+'/data/sdd/StorePurchaseOrderIn', 
                {
                    login : login,
                    json : json,
                    languageCode : languageCode
                });
    },

    confirmPurchaseOrder : function (login, languageCode, key, json) {
        return $.post(baseUrl+'/data/sdd/ConfirmPurchaseOrderIn', 
                {
                    login : login,
                    languageCode : languageCode,
                    key : key,
                    json : json
                });
    }

});
