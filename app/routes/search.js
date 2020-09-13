import Ember from 'ember';
import BaseRoute from './base';

import SearchAdapter from '../adapters/search';
import { getUserLanguage, setUserLanguage } from '../utils/common-utils';

export default BaseRoute.extend({
    queryParams:{
        searchFreeText: {
            refreshModel: true,
            replace: true
        },
        filterString: {
            refreshModel: true,
            replace: true
        },
        language: {
            refreshModel: true,
            replace: true
        },
    },
    currentLocal : null,
    beforeModel: function(params) {
        let i18nLocale = this.get('i18n.locale');
        this.set('currentLocal', i18nLocale);
        let userLanguage = getUserLanguage();
        let qpLanguage = params.queryParams.language;
        if (qpLanguage!=userLanguage) {
            // check qpLanguage within set
            setUserLanguage(qpLanguage);
            userLanguage = qpLanguage;//improve perf
        }
        if (i18nLocale!=userLanguage) { 
            //!! i18n and userLanguage are set the first time=> no load
            //TODO make distinct between first time and rest maybe in initialize
            //this.set('i18n.locale', userLanguage);//dup with fetch that set to
            
            this.get('translationsFetcher').fetch();
        }
    },
    model(params) {
        /*
        if (params.language) {
            let i18nLocale = this.get('currentLocal');
            if (i18nLocale!=params.language) { 
                this.get('translationsFetcher').fetch();
            }

            //setUserLanguage (params.language);
        }
        */
        if (params.searchFreeText) {
            let filter = {filters : params.filterString.split(',')};
            let language = params.language?params.language:getUserLanguage();
            var adapter = SearchAdapter.create();
            
            return adapter
                //.find(params.searchFreeText, params.filterString, getUserLanguage())
                .find(params.searchFreeText, params.filterString, language)
                .then(function(data) {
                    return {result : data.SearchFreetextOut};
                    //this.set('searchResult', data.SearchFreetextOut);
                    //Ember.set(Ember.get('searchResult', 'result'), 'result', data.SearchFreetextOut);
                })
                .catch(function(error) {
                    console.log("error = "+error);
                    return {
                        result : [
                            {locale : 'en', language : 'EN'}
                        ]
                    }
                });
        }       
    },
    setupController: function (controller, model) {
        this._super(controller, model);
    },
    
});
