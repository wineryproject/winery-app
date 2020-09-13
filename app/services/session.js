// app/services/session.js
//https://emberigniter.com/real-world-authentication-with-ember-simple-auth/
import DS from 'ember-data';
import ESASession from "ember-simple-auth/services/session";
import { storageFor } from 'ember-local-storage';

export default ESASession.extend({

  store: Ember.inject.service(),
  user : storageFor("user"),

  currentUser: Ember.computed('isAuthenticated', function() {
    if (this.get('isAuthenticated')) {
        //const promise = this.get('store').queryRecord('user', {})
        //return DS.PromiseObject.create({ promise: promise })
        var currentUser = this.get("store").createRecord('user');
        let user = this.get("user");
        let login = user.get("login");
        currentUser.set("email",login);
        return currentUser;
    }

  })

});