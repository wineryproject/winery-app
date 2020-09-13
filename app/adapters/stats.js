import DS from 'ember-data';
import {fetchData} from '../utils/common-utils';
import BaseAdapter from './base';

import appendQuery from 'npm:append-query';

import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default BaseAdapter.extend({
	//stats

	/* connector to EventsPerYearStat info */
    eventsPerYearStat : function(params) {
        return fetchData(baseUrl+'/data/sdd/EventsPerYearStatIn'+filterEventsPerYearStat(params));
    },

	/* connector to EventsExhibitorsStat info */
    eventsExhibitorsStat : function(params) {
        return fetchData(baseUrl+'/data/sdd/EventsExhibitorsStatIn'+filterEventsExhibitorsStat(params));
    },

	/* connector to StatCepageFilters info */
    statCepageFilters : function(params) {
        return fetchData(baseUrl+'/data/sdd/StatCepageFiltersIn'+filterStatCepageFilters(params));
    },

	/* connector to StatFilters info */
    statFilters : function(params) {
        return fetchData(baseUrl+'/data/sdd/StatFiltersIn'+filterStatFilters(params));
    },

	/* connector to EventsPerWeekStat info */
    eventsPerWeekStat : function(params) {
        return fetchData(baseUrl+'/data/sdd/EventsPerWeekStatIn'+filterEventsPerWeekStat(params));
    },

	/* connector to WineriesPerEventPerWeekStat info */
    wineriesPerEventPerWeekStat : function(params) {
        return fetchData(baseUrl+'/data/sdd/WineriesPerEventPerWeekStatIn'+filterWineriesPerEventPerWeekStat(params));
    },

	/* connector to WineRegionsPerEventPerWeekStat info */
    wineRegionsPerEventPerWeekStat : function(params) {
        return fetchData(baseUrl+'/data/sdd/WineRegionsPerEventPerWeekStatIn'+filterWineRegionsPerEventPerWeekStat(params));
    },

	/* connector to WineCountriesPerEventPerWeekStat info */
    wineCountriesPerEventPerWeekStat : function(params) {
        return fetchData(baseUrl+'/data/sdd/WineCountriesPerEventPerWeekStatIn'+filterWineCountriesPerEventPerWeekStat(params));
    },
    
});

//stats

/* filter for EventsPerYearStat entity */
function filterEventsPerYearStat (filter) {
	if (filter) {
		return appendQuery("",{
				"year":filter.year ,
				"eventCountryWebPath":filter.eventCountryWebPath ,
				}, 
				{ removeNull: true }
			);
	}
	return "";
}			

/* filter for EventsExhibitorsStat entity */
function filterEventsExhibitorsStat (filter) {
	if (filter) {
		return appendQuery("",{
				"year":filter.year ,
				"regionWebPath":filter.region ,
				"countryWebPath":filter.country,
				"gradeWebPaths":filter.gradeWebPaths,
				"isWineryBio":filter.isWineryBio ,
				"linkGrades":filter.linkGrades,
				"gradeWebPaths":filter.gradeWebPaths ,

				}, 
				{ removeNull: true }
			);
	}
	return "";
}			

/* filter for StatCepageFilters entity */
function filterStatCepageFilters (filter) {
	if (filter) {
		return appendQuery("",{
				"year":filter.year ,
				"eventCountryWebPath":filter.eventCountryWebPath ,
				"countryWebPath":filter.countryWebPath ,
				"regionWebPath":filter.regionWebPath ,
				//"cepageWebPath":filter.cepageWebPath , do not filter itself
				"type":filter.type ,
				"exists_Bio_NotBio": filter.exists_Bio_NotBio, //NONE, exists_Bio, exists_NotBio
				}, 
				{ removeNull: true }
			);
	}
	return "";
}			

/* filter for StatFilters entity */
function filterStatFilters (filter) {
	if (filter) {
		return appendQuery("",{
				"year":filter.year ,
				"eventCountryWebPath":filter.eventCountryWebPath ,
				}, 
				{ removeNull: true }
			);
	}
	return "";
}			

/* filter for EventsPerWeekStat entity */
function filterEventsPerWeekStat (filter) {
	if (filter) {
		return appendQuery("",{
				"year":filter.year ,
				}, 
				{ removeNull: true }
			);
	}
	return "";
}			

/* filter for WineriesPerEventPerWeekStat entity */
function filterWineriesPerEventPerWeekStat (filter) {
	if (filter) {
		return appendQuery("",{
				"year":filter.year ,
				}, 
				{ removeNull: true }
			);
	}
	return "";
}			

/* filter for WineRegionsPerEventPerWeekStat entity */
function filterWineRegionsPerEventPerWeekStat (filter) {
	if (filter) {
		return appendQuery("",{
				"year":filter.year ,
				}, 
				{ removeNull: true }
			);
	}
	return "";
}			

/* filter for WineCountriesPerEventPerWeekStat entity */
function filterWineCountriesPerEventPerWeekStat (filter) {
	if (filter) {
		return appendQuery("",{
				"year":filter.year ,
				}, 
				{ removeNull: true }
			);
	}
	return "";
}			
