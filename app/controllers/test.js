import Ember from 'ember';

export default Ember.Controller.extend({
    showMyModal: false,
    actions: {
        toggleShow() {
            this.set('showMyModal', !this.get('showMyModal'));
        }
    }
});