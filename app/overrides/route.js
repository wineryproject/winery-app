import Ember from 'ember';

Ember.Route.reopen({
  actions: {
    didTransition() {
      var self = this;
      if(self.get('pageHeading')) {
        this.controller.set('pageHeading', self.get('pageHeading'));
      }
      if(self.get('headerMenuActive')) {
        this.controller.set('headerMenuActive', self.get('headerMenuActive'));
      }
      return true; // bubble the event

    }
  }
});