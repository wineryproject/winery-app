import Ember from 'ember';

export default Ember.Route.extend({
    model() {
      return this.store.createRecord('feedback');
    },
    setupController: function (controller, model) {
        this._super(controller, model);
    },
    actions : {

    }
});
