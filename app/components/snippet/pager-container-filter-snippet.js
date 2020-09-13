import Ember from 'ember';

export default Ember.Component.extend({

    actions : {
        addProductFilter (event) {
            this.sendAction ("forwardActionFilter", event);
        }
    }
});
