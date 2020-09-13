import DS from 'ember-data';
import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({
    availableTranslation: function(){
        return fetchData(baseUrl+'/data/sdd/TranslationLanguageIn?isTranslated=true');
    }
});
