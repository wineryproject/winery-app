import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel() {
        //set homepage
        this.replaceWith('home');
    }
});
