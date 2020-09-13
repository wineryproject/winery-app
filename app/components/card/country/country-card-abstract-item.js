import Ember from 'ember';

import InViewportComponent from '../../../mixins/component-in-viewport';

export default Ember.Component.extend(InViewportComponent, {

    didEnterViewport() {
      this.set("inViewport", true); //TODO when exit enterViewport
      //only autonomous are concerned, if pass-thru then correct data are given to component
      //only if backend has not been called (ie once and only once)
      if (this.get('autonomous') 
        && !this.get("inViewportRendered")) { 
          this.set("inViewportRendered", true);
          this.get('countryService').findWithInfo(
              this.get("countryId"),
              this.get("countryWebPath"),
              1
            ).then((data) => {this.set('data', data.CountryDescriptionWithInfoOut[0]);
        });
      }
    },

    autonomous : null,
    data : null,
    countryId : null,
    countryWebPath : null,

    countryService: Ember.inject.service("country"),
    didInsertElement() {
      this._super(...arguments);
    },
});
