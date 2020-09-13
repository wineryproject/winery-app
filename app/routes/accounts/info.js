import Ember from 'ember';

import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { storageFor } from 'ember-local-storage';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    userService : Ember.inject.service("user"),
    authManager: Ember.inject.service('session'),
    titleToken: ['nav.user-info'],
    user : storageFor("user"),

    model(params) {
        //var user = this.get("store").createRecord('user');
        let user = this.get("user");
        let login = user.get("login");
        return this.get('userService').fetch(login)
        .then(data => {
            return data.UserInfoOut[0];
        })
        .catch(data => {
            //in the event of not authorized
            //invalidate session
            //route to login page
            //TODO should be handled at each 403 http status 
            //this.get('authManager').invalidate();
            /*
            let user = this.get("user");
            let login = user.login;
            user.clear();
            this.transitionTo("accounts.login");
            */
         }) ;
    },
});
