import Ember from 'ember';

import BaseRoute from './base';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default BaseRoute.extend(AuthenticatedRouteMixin, {
    authenticationRoute : "/accounts/login",
    model() {
        return this.store.createRecord('description');
    },
});
