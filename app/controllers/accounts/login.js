import Controller from '@ember/controller';

import config from '../../config/environment';
import { storageFor } from 'ember-local-storage';
const { rootUrl } = config.USER_MANAGEMENT_URL;
const userManagementUrl = rootUrl + '/userfrosting';

export default Controller.extend({

    identification : null,
    password : null,
    userRegistrationUrl :  userManagementUrl+"/account/register", //TODO remove duplicate
    user : storageFor("user"),
    cart : storageFor("cart"),
    session: Ember.inject.service(),
    actions: {
        authenticate: function() {
            let cart = this.get("cart");
            let userLogin = this.get("user");
            let identification = this.get("identification");
            userLogin.set("login", identification);
            var credentials = this.getProperties
                ('identification', 'password'),
                authenticator = 'authenticator:jwt';
            this.get('session')
                .authenticate(authenticator, credentials)
                .catch((reason)=>{
                this.set('errorMessage', reason.error || reason);
            });
        }
    }
});
