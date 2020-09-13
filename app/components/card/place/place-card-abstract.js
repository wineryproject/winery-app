import Ember from 'ember';

import InViewportComponent from '../../../mixins/component-in-viewport';
import InViewportMixin from 'ember-in-viewport';
export default Ember.Component.extend(InViewportComponent, {

  inViewport : false,
  inViewportRendered : false,

  //data:null, just for log
  isInViewport: Ember.computed('inViewport',
      function() {
          return this.get('inViewport');
      }
  ),
  
  didEnterViewport() {
    this.set("inViewport", true); //TODO when exit enterViewport
    /*
    console.log(">>>> place didEnterViewport");
    console.log(">>>> place didEnterViewport this.get('autonomous') "+this.get('autonomous'));
    console.log(">>>> place didEnterViewport this.get('placeWebPath') "+this.get('placeWebPath'));
    console.log(">>>> place didEnterViewport this.get('inViewportRendered') "+this.get("inViewportRendered"));
    */
    if (this.get('autonomous') 
      && this.get('placeWebPath') 
      && !this.get("inViewportRendered")) {
        this.set("inViewportRendered", true);
        this.get('placeService').find(this.get("placeWebPath")).then((data) => {//TODO replace by webpath
            let place = data.LieuDitBadgeOut[0];
            //TODO choose convention between generic data object and custom business : place object
            this.set('data', place);
        });
    }
    
  },

  tagName:'',
  autonomous : null,
  data : null,
  placeWebPath : null, //may hold duplicated or store a combo ref

  placeService: Ember.inject.service("place"),


  didInsertElement() {
    this._super(...arguments);
    /**/
    if (this.get('autonomous') && this.get('placeWebPath')) {
      this.get('placeService').find(this.get("placeWebPath")).then((data) => {//TODO replace by webpath
          let place = data.LieuDitBadgeOut[0];
          //TODO choose convention between generic data object and custom business : place object
          this.set('data', place);
      });
    }
    
  }
});
