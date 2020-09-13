import Ember from 'ember';
import Route from '@ember/routing/route';
import BaseRoute from '../base';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default BaseRoute.extend(AuthenticatedRouteMixin, {
    authenticationRoute : "/accounts/login",
    routeHistory: Ember.inject.service(),

    beforeModel(transition) {
          const currentRouteName = this.get('routeHistory.current'); // Returns the current route name.
          if ("purchase.checkout" != currentRouteName) {
              this.transitionTo("/purchase");
          }
    }
});
