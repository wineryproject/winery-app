import Ember from 'ember';
import base from '../../../mixins/component-base-mixin';
import InViewportMixin from 'ember-in-viewport';
//import InViewportComponent from '../../../mixins/component-in-viewport';

export default Ember.Component.extend(base, InViewportMixin, {

    inViewport : false,
    isInViewport: Ember.computed('inViewport',
        function() {
            return this.get('inViewport');
        }
    ),
    didEnterViewport() {
        this.set("inViewport", true);
    },
    /*
    didInsertElement() {
        this.set("inViewport", true);
        console.log("didInsertElement ");
    },
    */

});
