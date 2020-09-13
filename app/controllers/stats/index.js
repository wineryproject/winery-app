import Ember from 'ember';
import { getCountryInfo } from '../../utils/common-utils';
import { computed } from '@ember/object';
import _ from 'lodash';
import { task } from 'ember-concurrency';

export default Ember.Controller.extend({
    queryParams: [
        'year',
        'country',
        'region',
        'isWineryBio',
        'isWineryBioDynamic',
        'eventCountryWebPath',
        'cepageWebPath',
        'grades',
    ],
    year : null,
    country : null,
    region : null,
    isWineryBio : null,
    isWineryBioDynamic : null,
    eventCountryWebPath:null,
    cepageWebPath:null,
    grades:null,
    cepageFilter : null,
    cepageChartData : null,
    statsService : Ember.inject.service("stats"),

    countryStoreInfo : computed('country', function() {
        return getCountryInfo(this.get('country'));
    }),
    regionInfo : computed('region', function() {
        let region = this.get("region");
        let model = this.get("model");
        return getRegionFilter(model, region);
    }),
    countryInfo : computed('country', function() {
        let country = this.get("country");
        let model = this.get("model");
        return getCountryFilter(model, country);
    }),
    showGrades : computed('year','country','region','eventCountryWebPath','isWineryBio', function() {
        let year = this.get("year");
        let country = this.get("country");
        let region = this.get("region");
        let model = this.get("model");
        this.set("cepageFilter",null);
        return year && (country || region);
    }),
    stats : computed (
        "year",
        "eventCountryWebPath", 
        "country", 
        "region",
        "gradeWebPaths",
         function() {
        let year = parseInt(this.get("year"));
        let eventCountryWebPath = this.get("eventCountryWebPath");
        let country = this.get("country");
        let model = this.get("model");
  
        let region = this.get("region");
        if (region) {
            return getStats(getRegionFilter(model, region))
        }
        if (country) {
            return getStats(getCountryFilter(model, country))
        }
        if (year) {
            return getStats(getYearFilter(model, year, eventCountryWebPath))
        }       
        return null;   
    }),
    // Preparing the chart data
    cepagesDataSource : { chart: {
        caption: "Cepages", //Set the chart caption
        subCaption: "", //Set the chart subcaption
        xAxisName: "Grades", //Set the x-axis name
        yAxisName: "Wineries", //Set the y-axis name
        numberSuffix: "",
        theme: "fusion" //Set the theme for your chart
        },
        // Chart Data - from step 2
        data: null
    },
    findGrades : task(function * () {
        let statsService = this.get("statsService");
        let year = parseInt(this.get("year"));
        let eventCountryWebPath = this.get("eventCountryWebPath");
        let country = this.get("country");
        let grades = this.grades;
        let isWineryBio = this.get("isWineryBio");

        let region = this.get("region");
        let params = {
            "year":year,
            "eventCountryWebPath":eventCountryWebPath,
            "countryWebPath":region?null:country, //region prevails
            "regionWebPath":region,
            "cepageWebPath":grades,
            }

        debugger
        if (isWineryBio=="true") {
            params.exists_Bio_NotBio="exists_Bio";
        }
        if (isWineryBio=="false") {
            params.exists_Bio_NotBio="exists_NotBio";
        }
        let cepageFilter = yield statsService.statCepageFilters(params);
        this.set('cepageFilter', cepageFilter);
        this.set('cepageChartData', getChart(cepageFilter));

        let prevDs = Object.assign({}, this.get('cepagesDataSource'));
        prevDs.data = getChart(cepageFilter);
        this.set('cepagesDataSource', prevDs);
    }),  
    
    closeCepageFilter:task(function * ()  {
        this.set("cepageFilter",null);
    }),
    
});

function getChart(cepageFilter) {
    return _.map(cepageFilter.StatCepageFiltersOut, function (i) {
        return {label : i.cepageName, value: i.nbDistinctWineries }
    });
}

function getCountryFilter(model, country) {
    let info = _.filter(model.statFiltersOut, 
        {
            'type':'country',
            'webPath':country,
        }
        );
    return _.head(info);   
}

function getYearFilter(model, year, eventCountryWebPath) {
    let info = _.filter(model.statFiltersOut, 
        {
            'type':'year',
            'eventCountryWebPath' : eventCountryWebPath,
            year:year,
        }
        );
    return _.head(info);   
}

function getRegionFilter(model, region) {
    let info = _.filter(model.statFiltersOut, 
        {
            'type':'region',
            'webPath':region,
        }
        );
    return _.head(info);   
}

function getStats(filter) {
    let pcBioDistinctWineries = Math.floor(filter.nbDistinctWineriesBio/filter.nbDistinctWineries*100);
    let pcNoBioDistinctWineries = 100 - pcBioDistinctWineries;
    let pcBioExhibitors = Math.floor(filter.nbExhibitorsBio/filter.nbExhibitors*100);
    let pcNoBioExhibitors = 100 - pcBioExhibitors;
    return {
        nbExhibitors : filter.nbExhibitors,
        nbExhibitorsBio : filter.nbExhibitorsBio,
        nbExhibitorsNoBio : filter.nbExhibitors - filter.nbExhibitorsBio,
        pcBioExhibitors : pcBioExhibitors,
        pcNoBioExhibitors : pcNoBioExhibitors,

        nbDistinctWineries : filter.nbDistinctWineries,
        nbDistinctWineriesBio : filter.nbDistinctWineriesBio,
        nbDistinctWineriesNoBio : filter.nbDistinctWineries - filter.nbDistinctWineriesBio,
        pcBioDistinctWineries : pcBioDistinctWineries,
        pcNoBioDistinctWineries : pcNoBioDistinctWineries,

        bio : {
            exhibitor : {
                nb : filter.nbExhibitors,
                nbBio : filter.nbExhibitorsBio,
                nbNoBio : filter.nbExhibitors - filter.nbExhibitorsBio,
                pcBio : pcBioExhibitors,
                pcNoBio : pcNoBioExhibitors,
            },
            distinctWineries : {
                nb : filter.nbDistinctWineries,
                nbBio : filter.nbDistinctWineriesBio,
                nbNoBio : filter.nbDistinctWineries - filter.nbDistinctWineriesBio,
                pcBio : pcBioDistinctWineries,
                pcNoBio : pcNoBioDistinctWineries,
            },

        }
    }
}