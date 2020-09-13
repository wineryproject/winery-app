import Ember from 'ember';
import Adapter from '../adapters/stats';
import { hash } from 'rsvp';
import _ from 'lodash';
export default Ember.Service.extend({
	
    eventsPerYearStat (params) {
        var adapter = Adapter.create(); 
        return adapter.eventsPerYearStat(params);
    },

    eventsPerWeekStat (params) {
        var adapter = Adapter.create(); 
        return adapter.eventsPerWeekStat(params);
    },

    wineriesPerEventPerWeekStat (params) {
        var adapter = Adapter.create(); 
        return adapter.wineriesPerEventPerWeekStat(params);
    },

    wineRegionsPerEventPerWeekStat (params) {
        var adapter = Adapter.create(); 
        return adapter.wineRegionsPerEventPerWeekStat(params);
    },

    wineCountriesPerEventPerWeekStat (params) {
        var adapter = Adapter.create(); 
        return adapter.wineCountriesPerEventPerWeekStat(params);
    },

    statsInfo (params) {
        var adapter = Adapter.create();
        var eventsPerYearStatPromise = adapter.eventsPerYearStat({})
		.then(d => {
			return d.EventsPerYearStatOut;
        });
        if (params.grades) {
            params.gradeWebPaths = params.grades;
            params.linkGrades=true;
        }
        var eventsExhibitorsStatPromise = adapter.eventsExhibitorsStat(params)
		.then(d => {
			return d.EventsExhibitorsStatOut;
		});
		var statFiltersPromise = adapter.statFilters(params)
		.then(d => {
			return d.StatFiltersOut;
		});
		var promises = {
            EventsPerYearStatOut : eventsPerYearStatPromise,
            eventsExhibitorsStatOut : eventsExhibitorsStatPromise,
            statFiltersOut : statFiltersPromise,
        };
        return hash(promises);
    },

    statCepageFilters : function(params) {
        var adapter = Adapter.create();
        return adapter.statCepageFilters(params);
    },

    eventsExhibitorsStat: function (params) {
        var adapter = Adapter.create(); 
        return adapter.eventsExhibitorsStat(params);
    },

	statsPerYear: function(params) {
        //TODO check year present
        var adapter = Adapter.create(); 
        var eventsPerWeekStatPromise = adapter.eventsPerWeekStat(params.webpath) //winery_id webpath
        .then(function(data) {
                return data.EventsPerWeekStatOut;
            }
        );
        var wineriesPerEventPerWeekStatPromise = adapter.wineriesPerEventPerWeekStat(params.webpath) //winery_id webpath
        .then(function(data) {
                return data.WineriesPerEventPerWeekStatOut;
            }
        );
        var wineRegionsPerEventPerWeekStatPromise = adapter.eventsPerWeekStat(params.webpath) //winery_id webpath
        .then(function(data) {
                return data.EventsPerWeekStatOut;
            }
        );
        var eventsPerWeekStatPromise = adapter.eventsPerWeekStat(params.webpath) //winery_id webpath
        .then(function(data) {
                return data.EventsPerWeekStatOut;
            }
        );
	},
});
/*
function splitExhibitors(item) {
    var details = item.exhibitorDetails?item.exhibitorDetails.split(','):[]; 
    var exhibitorDetails = []; 
    _.each(details, (e) => {
        exhibitorDetails.push(splitExhibitor(e));
    });
    return exhibitorDetails;
}
function splitExhibitor(e) {
    let a = e.split('|');
    let aj = {
        wineryName : a[0],
        wineryWebPath : a[1],
        regionWebPath : a[2],
        countryWebPath : a[3],
    }
    return aj;
}
function splitEvents(item) {
    var details = item.eventDetails?item.eventDetails.split(','):[]; 
    var eventDetails = []; 
    _.each(details, (e) => {
        eventDetails.push(splitEvent(e));
    });
    return eventDetails;
}
function splitEvent(e) {
    let a = e.split('|');
    let aj = {
        eventName : a[0],
        eventWebPath : a[1],
    }
    return aj;
}
*/
