import Ember from 'ember';

export default Ember.Component.extend({
    modal : false,
    isInvitation : false,
    isPresaleEntranceFee : false,
    actions : {
        submit() {
            console.log("submit");
        }
    }
});
