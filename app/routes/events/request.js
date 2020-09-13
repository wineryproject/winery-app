import Ember from 'ember';
import BaseRoute from '../base';

export default BaseRoute.extend({
    myParams : [],
    setupController(controller, model) {
        // Call _super for default behavior
        this._super(controller, model);
        // Implement your custom setup after
        controller.set('myParams', this.get('myParams'));
    },
});
