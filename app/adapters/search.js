import DS from 'ember-data';
import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

/**/
import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;


export default BaseAdapter.extend({
    //use ember data for find and homePageSuggestions since returned objects are the same
    find: function(freeText, filterString, languageCode){
        return fetchData(baseUrl+'/data/sdd/SearchFreetextIn?languageCode='+languageCode+'&latitude=0&longitude=0&entityFilter='+filterString+'&maxResults=5&match='+freeText);
    },

    homePageSuggestions: function(languageCode, longitude, latitude) {
        return fetchData(baseUrl+'/data/sdd/LastUpdatedEntitiesSuggestionIn?nbOfResult=15&languageCode='+languageCode+'&latitude=0&longitude=0');
    }

});
