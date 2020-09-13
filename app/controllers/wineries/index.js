import Controller from '@ember/controller';
import _ from 'lodash';
import {toDisplayDomain, setDisplayCount, setDisplayWineries} from '../../utils/business-utils';

//TODO GENERIC code with controller for appellations,cepages (inner-search-controller)
export default Controller.extend({
    queryParams: ['country','region','place','grape','appellation','searchFreeText'],
    country : null,
    region : null,
    grape : null,
    place : null,
    myParams: null,
    searchFreeText:null,
    hasCountryFilter: Ember.computed.notEmpty('country'),
    hasRegionFilter: Ember.computed.notEmpty('region'),
    hasGrapeFilter: Ember.computed.notEmpty('grape'),
    hasPlaceFilter: Ember.computed.notEmpty('place'),
    hasAppellationFilter: Ember.computed.notEmpty('appellation'),
    perspective : 'winery',
    
    hasFilter: Ember.computed('hasCountryFilter', 'hasRegionFilter','hasGrapeFilter','hasPlaceFilter', 'hasAppellationFilter',
        function() {
            return (this.get('hasCountryFilter') 
                 || this.get('hasRegionFilter') 
                 || this.get('hasGrapeFilter')
                 || this.get('hasPlaceFilter')
                 || this.get('hasAppellationFilter')
                 )
        }
    ),

    setInnerFilter(value){
        toDisplayDomain(this.get("model").WineryPublicOut, value);
        setDisplayWineries(this.get("model"), this.get("model").WineryPublicOut);
        setDisplayCount(this.get("model"), this.get("model").WineryPublicOut);
        this.set("searchFreeText",value);
    },

    actions : {
        setGrapeFilter (webPath) {
            this.set("grape", webPath);
        },
        setCountryFilter (webPath) {
        //TUTO-DDAU-bubble-up-component-to-controller(4-controller template)
        //TUTO-DDAU-bubble-up-component recieved from component inner-search-filter
        //TUTO-DDAU-bubble-up-component inner-search-filter component reference in index.hbs holds the action name resolver : setCountryFilter="setCountryFilter"
        //TUTO-DDAU-bubble-up-component inner-search-filter.js sendAction
            this.set("country", webPath);
        },
        removeFilter(event) {
            //TUTO-LIMITATION-FOUND
            // for backend transitionToRoute with Router refreshModel: true,
            //emberjs sends twice the transition to appelation one with the expected params and then the one with the original param
            // workaround in template {{#link-to "appellations" (query-params country=null)}}
            //this.transitionToRoute('appellations',{ queryParams: {'country':'france'}});
        },
        addFilter(event) {
            var value = $(event.target).html(); //event.target.textContent
            var key = $(event.target).data("value");
            this.get("optionFilterDdl").forEach(function(item) {   
                if (item.key ==  key) {
                    Ember.set(item, 'class','active');     
                } else {
                    Ember.set(item, 'class','');  
                }
            });
        },
        handleInnerFilter(value){
            Ember.run.debounce(this, this.setInnerFilter,value, 500);
        }
    }

});