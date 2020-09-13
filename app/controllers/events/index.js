import Controller from '@ember/controller';
import _ from 'lodash';
import {toDisplayEvent, setDisplayCount, setDisplayEvents} from '../../utils/business-utils';

//TODO GENERIC code with controller for appellations,cepages (inner-search-controller)
export default Controller.extend({
    queryParams: ['country','searchFreeText'],
    country : null,
    searchFreeText:null,
    hasCountryFilter: Ember.computed.notEmpty('country'),
    perspective : 'event',
    
    hasFilter: Ember.computed('hasCountryFilter',
        function() {
            return (this.get('hasCountryFilter') 
                 )
        }
    ),

    setInnerFilter(value){
        toDisplayEvent(this.get("model").events.EventInfoOut, value);
        setDisplayEvents(this.get("model").events, this.get("model").events.EventInfoOut);
        setDisplayCount(this.get("model").events, this.get("model").events.EventInfoOut);
        
        this.set("searchFreeText",value);
    },

    actions : {
        setCountryFilter (webPath) {
            this.set("country", webPath);
        },
        addFilter(event) {
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