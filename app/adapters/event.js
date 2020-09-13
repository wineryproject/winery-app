import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';
import appendQuery from 'npm:append-query';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({
    findAll: function(params){
        return fetchData(baseUrl+'/data/sdd/EventInfoIn'+formatEventInfoFilter(params));
    },
    findByWebpath: function(webPath){
        return fetchData(baseUrl+'/data/sdd/EventInfoIn?webPath='+webPath);
    },
    findByWineryWebpath: function(wineryWebPath){
        return fetchData(baseUrl+'/data/sdd/ParticipantsForEventIn?wineryWebPath='+wineryWebPath);
    },
    //the email is provided by the jwt token resolution
    hasWineryEventOwnership: function(wineryWebPath, eventWebPath, email){
        return fetchData(baseUrl+'/data/sdd/HasWineryEventOwnershipIn?wineryWebPath='+wineryWebPath+'&eventWebPath='+eventWebPath+"&userEmail="+email);
    },
    eventSummary : function(params) {
        return fetchData(baseUrl+'/data/sdd/EventSummaryIn'+filterEventSummary(params));
    },

});

function formatEventInfoFilter(filters) {
    if (filters) {
        return appendQuery("",{
            "countryWebPath":filters.country, 
            "webPath":filters.webPath,
            "timeline" : filters.timeline,
            "order_by" : filters.orderBy,
            "fromDateGreaterThan" : filters.fromDateGreaterThan

        }, { removeNull: true });
    }
    return "";
}

/* filter for EventSummary entity */
function filterEventSummary (filter) {
	if (filter) {
		return appendQuery("",{
				"webPath":filter.webPath ,
				"countryWebPath":filter.countryWebPath ,
				"timeline":filter.timeline ,
				}, { removeNull: true }
			);
	}
	return "";
}	