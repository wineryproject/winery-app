import Ember from 'ember';
import _ from 'lodash';
import {getUserI18n} from '../utils/common-utils';
import { storageFor } from 'ember-local-storage';
import config from '../config/environment';

//import config from '../config/environment';
//const { host, namespace } = config.DS;

const { rootUrl } = config.USER_MANAGEMENT_URL;
const userManagementUrl = rootUrl + '/userfrosting';

import { computed } from '@ember/object';

export default Ember.Component.extend({

    router: Ember.inject.service(),
    availableTranslation : {},
    i18n: Ember.inject.service(),
    language: Ember.inject.service(),
    authManager: Ember.inject.service('session'),

    cart : storageFor("cart"),
    user : storageFor("user"),
    nbOfItemsInCart : computed('cart.[]', function() {
        return this.get("cart.content.length");
    }),
    hasShoppingCart : computed('nbOfItemsInCart', function() {
        return this.get("nbOfItemsInCart") > 0;
    }),
    isUserDdlDisplayed : false,
    isLanguageDdlDisplayed : false,
    isAdminDdlDisplayed : false,

    userRegistrationUrl :  userManagementUrl+"/account/register",
    
    userPasswordForgottenUrl : userManagementUrl+"/account/forgot-password",
    
    didInsertElement() {
      //TUTO-JS interpolation alert(`Name is ${this.get('name')}`);
      this._super(...arguments);
      let loc = getUserI18n();
   
      //TUTO component load data 
      //TUTO REF https://emberigniter.com/render-promise-before-it-resolves/
      this.get('language').availableLanguages().then((data) => {
          //TODO add active where loc=data.local in lodash
          //var filters = _.filter(data.TranslationLanguageOut, {'locale' : loc});
            _.each(data.TranslationLanguageOut, function (item) {
                if (item.locale == loc) {
                    item.class = 'active';
                }
            });
            
            this.set('availableTranslation', data);
        });
        /**/
        $('.rollupback').on('click', function(){
            $(".navbar-toggle").click();
        });
        
    },
    actions : {
        menuClick : function(scope) {
            //TUTO-QUESTION lazy loading of list of translation available
            //TUTO-QUESTION parallel loading?
            //TUTO component lifecycle event to improve

            //TUTO-PERF adding component on homepage slow down rendering...
            //TUTO-PERF maybe use asyn instead of promise
            //TUTO-PERF use caching
            if ("language"==scope) {
                //this.set("isUserDdlDisplayed", false);
                resetDdlSafe(this,"isLanguageDdlDisplayed");
                let isLanguageDdlDisplayed = this.get("isLanguageDdlDisplayed");
                this.set("isLanguageDdlDisplayed", !isLanguageDdlDisplayed);
            }
            else if ("user"==scope) {
                //this.set("isLanguageDdlDisplayed", false);
                resetDdlSafe(this,"isUserDdlDisplayed");
                let isUserDdlDisplayed = this.get("isUserDdlDisplayed");
                this.set("isUserDdlDisplayed", !isUserDdlDisplayed);
            } 
            else if ("admin"==scope) {
                resetDdlSafe(this, 'isAdminDdlDisplayed');
                this.set("isAdminDdlDisplayed", !this.get("isAdminDdlDisplayed"));
            } 
            /*
            else if ("search"==scope) {
                this.get('router').transitionTo('search');
                //this.transitionToRoute('search');
            }
            else if ("wineries"==scope) {
                this.get('router').transitionTo('wineries.index');
                //this.transitionToRoute('wineries');
            }
            else if ("appellations"==scope) {
                this.get('router').transitionTo('appellations');
                //this.transitionToRoute('wineries');
            }
            */
        },
        invalidateSession() {
            this.get('authManager').invalidate();
            this.get('user').clear();
        }
    }
});

function resetDdl(that) {
    resetDdlSafe(that, null);
}

function resetDdlSafe(that, ddl) {
    if ("isLanguageDdlDisplayed"!=ddl) {
        that.set("isLanguageDdlDisplayed", false);
    }
    if ("isUserDdlDisplayed"!=ddl) {
        that.set("isUserDdlDisplayed", false);
    }
    if ("isAdminDdlDisplayed"!=ddl) {
        that.set("isAdminDdlDisplayed", false);
    }
}
