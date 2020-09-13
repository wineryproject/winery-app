import Controller from '@ember/controller';
import _ from 'lodash';
import {toDisplay, setDisplayCount} from '../../utils/business-utils';

export default Controller.extend({
    //TUTO Countroller queryParams binding 
    //1) declaration in queryParams: ['country']
    //2) reference as a property country : null
    queryParams: ['country','region','place','grape','color','searchFreeText'],
    country : null,
    region : null,
    grape : null,
    place : null,
    color : null,
    myParams: null,
    searchFreeText:null,
    hasCountryFilter: Ember.computed.notEmpty('country'),
    hasRegionFilter: Ember.computed.notEmpty('region'),
    hasGrapeFilter: Ember.computed.notEmpty('grape'),
    hasPlaceFilter: Ember.computed.notEmpty('place'),
    hasColorFilter: Ember.computed.notEmpty('color'),

    optionFilterDdl : [
        { key : "country", value : 'Country', i18n : 'field.country', class:''},
        { key : "cepage", value : 'Cepage', i18n : 'field.cepage', class:''},
        { key : "color", value : 'Color', i18n : 'field.color', class:''}
    ],
    
    hasFilter: Ember.computed('hasCountryFilter', 'hasRegionFilter','hasGrapeFilter','hasPlaceFilter','hasColorFilter',
        function() {
            return (this.get('hasCountryFilter') || this.get('hasRegionFilter') || this.get('hasGrapeFilter')|| this.get('hasPlaceFilter')|| this.get('hasColorFilter'))
        }
    ),

    setInnerFilter(value){
        toDisplay(this.get("model").AppelationBadgeOut, value);
        setDisplayCount(this.get("model"), this.get("model").AppelationBadgeOut);        
        this.set("searchFreeText",value);
    },

    actions :  {
        setGrapeFilter (webPath) {
            this.set("grape", webPath);
        },
        setColorFilter (webPath) {
            this.set("color", webPath);
        },
        setCountryFilter (countryWebPath) {
            //TUTO-DDAU-bubble-up-controller-reception(4-component-parent template)
            this.set("country", countryWebPath);
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
            //this.set("country", "italy");
            //load model country nm cepage appellation
            // vs
            // distinct country where appellation exist and cepage (optional)
            // distinct cepage where appellation exist and country, (optional)
        },
        handleInnerFilter(value){   
            Ember.run.debounce(this, this.setInnerFilter,value, 500);
        }
    }

});