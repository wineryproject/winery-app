import Controller from '@ember/controller';
import {toDisplay, setDisplayCount} from '../../utils/business-utils';

export default Controller.extend({
    queryParams: ['grape','searchFreeText'],
    grape : null,
    searchFreeText:null,
    hasGrapeFilter: Ember.computed.notEmpty('grape'),
    optionFilterDdl : [
        { key : "cepage", value : 'Cepage', i18n : 'field.cepage', class:''}
    ],
    hasFilter: Ember.computed('hasGrapeFilter',
        function() {
            return ( this.get('hasGrapeFilter'))
        }
    ),
    setInnerFilter(value){
        toDisplay(this.get("model").CountryDescriptionWithInfoOut, value);
        setDisplayCount(this.get("model"), this.get("model").CountryDescriptionWithInfoOut);
        this.set("searchFreeText",value);
    },

    actions :  {
        setGrapeFilter (webPath) {
            this.set("grape", webPath);
        },
        addFilter(event) {
            var value = $(event.target).html();
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
        },
        nextInViewport(page) {
            console.log('country countroller nextInViewport load ... '+page);
            var myModel = this.get("model");
            var allCountry = this.get("allCountries");
            //this.sendAction("nextInViewport", page);
        }
    }
});
