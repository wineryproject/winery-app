import Controller from '@ember/controller';
import _ from 'lodash';
import { getUserLanguage } from '../utils/common-utils';
import config from '../config/environment';

export default Controller.extend({
    //TODO in super controller add env for all controller
    environment : config.ENVIRONMENT,

    queryParams: ['searchFreeText','filterString', {'language' : 'searchLanguage'}],
    
    searchFreeText : '',
    aSearchFreeText: Ember.computed.oneWay('searchFreeText'),

    filterString : '',
    afilterString : Ember.computed.oneWay('filterString'),

    searchLanguage:'',

    displayFilters : Ember.computed('filterString', function(){
        this.get('filterString').split(",");
    }),
    
    filterHolder : Ember.computed('filterString', function(){
        let result = [];
        var options = this.get("optionFilterDdl");
        var filters = this.get("filterString").split(',');
        getFilterKeysByKey(options, filters, result);

        this.get("optionFilterDdl").forEach(function(item/*, index*/) {   
            _.forEach(filters, function (filter) {
                if (item.key ==  filter) {
                    //TODO use optionFilterDdl as an Ember computed 
                    //Ember.set(item, 'class','active');     
                }
            });
        });

        this.set("displayFilters",result);
        return {filters : result};
    }),

    isDisabled: Ember.computed('aSearchFreeText', function() {
        return this.get('aSearchFreeText').length < 2;
    }),

    hasFilter : Ember.computed('displayFilters', function() {
        return this.get('filterHolder.filters').length > 0;
    }),

    optionFilterDdl : [
        { key : "ref_appelation", value : 'Appelation', i18n : 'field.appelation', class:''},
        { key : "winery", value : 'Winery', i18n : 'field.winery', class:''},
        { key : "region", value : 'Region', i18n : 'field.region', class:''},
        { key : "country", value : 'Country', i18n : 'field.country', class:''},
        { key : "lieu_dit", value : 'Place', i18n : 'field.lieu-dit', class:''},
        { key : "wine", value : 'Product', i18n : 'field.product', class:''},
        { key : "cepage", value : 'Cepage', i18n : 'field.cepage', class:''}
    ],

    actions : {
        search(searchFreeText) {
            var filters = _.filter(this.get("optionFilterDdl"), {'class' : 'active'});
            filters.forEach(function(item/*, index*/) {   
                filterString += item.key +',' 
            });
            //For URL
            //https://ember-twiddle.com/4b55c49788e6448cebd6d6fe947118ed
            this.set("searchFreeText", searchFreeText);
            let ln = this.get('searchLanguage')?this.get('searchLanguage'):getUserLanguage();
            this.set("searchLanguage", ln);         
        },
        addFilter(event) {
            var value = $(event.target).html(); //event.target.textContent
            if (!_.includes(this.get("displayFilters"),value)) {
                this.set("displayFilters",_.union(this.get("displayFilters"),[value]));
                //TUTO cannot pass array in properties or Do not know how so use a container obj
                this.set("filterHolder", {filters : this.get("displayFilters")});

                var key = $(event.target).data("value");
                this.get("optionFilterDdl").forEach(function(item/*, index*/) {   
                    if (item.key ==  key) {
                        Ember.set(item, 'class','active');     
                    }
                });

                var result = [];
                var options = this.get("optionFilterDdl");
                var filters = this.get("displayFilters");
                getFilterKeys(options, filters, result);
                this.set("filterString", result.join());

            } 
        },
        removeFilter(event) {
            var value = $(event.target).data("filter");
            this.set("displayFilters",_.difference(this.get("displayFilters"),[value]));

            //TODO put in method common code
            this.set("filterHolder", {filters : this.get("displayFilters")});

            this.get("optionFilterDdl").forEach(function(item/*, index*/) {   
                if (item.value ==  value) {
                    Ember.set(item, 'class','');     
                }
            });

        
           var result = [];
           var options = this.get("optionFilterDdl");
           var filters = this.get("displayFilters");
           getFilterKeys(options, filters, result);
           this.set("filterString", result.join());
        }

    }
});

function getFilterKeys(options, filters, result) {
    _.forEach(options, function (option) {
        _.forEach(filters, function (filter) {
            if (option.value === filter) {
                result.push(option.key);
            }
        });
    });
}

function getFilterKeysByKey(options, filters, result) {
    _.forEach(options, function (option) {
        _.forEach(filters, function (filter) {
            if (option.key === filter) {
                result.push(option.value);
            }
        });
    });
}

function getFilterString () {

}
//TUTO add custom function inside controller
function addPropertyInList (list, prop) {
    if (!_.includes(list, prop)) {
        list += ','+prop;
    };    
    return list;
}

