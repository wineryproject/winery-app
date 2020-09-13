import Ember from 'ember';
import {toDisplay, setDisplayCount} from '../../utils/business-utils';
//TODO heritage InnerSearchController
export default Ember.Controller.extend({
    queryParams: ['country','region','place','appellation','color','searchFreeText'],
    country : null,
    region : null,
    grade : null,
    place : null,
    color : null,
    myParams: null,
    searchFreeText:null,

    hasCountryFilter: Ember.computed.notEmpty('country'),
    hasColorFilter: Ember.computed.notEmpty('color'),

    hasFilter: Ember.computed('hasCountryFilter','hasColorFilter',
        function() {
            return (this.get('hasCountryFilter')|| this.get('hasColorFilter'))
        }
    ),
    optionFilterDdl : [
        { key : "country", value : 'Country', i18n : 'field.country', class:''},
        { key : "appellation", value : 'Appellation', i18n : 'field.cepage', class:''},
        { key : "color", value : 'Color', i18n : 'field.color', class:''}
    ],

    setInnerFilter(value){
        toDisplay(this.get("model").CepageDescriptionOut, value);
        setDisplayCount(this.get("model"), this.get("model").CepageDescriptionOut);           
        this.set("searchFreeText",value);
    },

    actions :  {
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
        setCountryFilter (countryWebPath) {
            this.set("country", countryWebPath);
        },
        setColorFilter (webPath) {
            this.set("color", webPath);
        },
        handleInnerFilter(value){   
            Ember.run.debounce(this, this.setInnerFilter,value, 500);
        }
    }

});
