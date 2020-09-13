import Ember from 'ember';

import base from './component-base-mixin';
import InViewportMixin from 'ember-in-viewport';

export default Ember.Mixin.create(base, InViewportMixin, {
    //TODO duplicate code with image-author-link
    inViewport : false,
    inViewportRendered : false,
  
    isInViewport: Ember.computed('inViewport',
        function() {
            return this.get('inViewport');
        }
    ),   

    didEnterViewport() {
        this.set("inViewport", true);
        //let webpath = this.get("data.webPath");
        //console.log("enter view port");
    },

});