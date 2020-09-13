import Ember from 'ember';

import {prepareEvent} from '../../../utils/business-utils';
import config from '../../../config/environment';

export default Ember.Component.extend({
    autonomous : null,
    event : null,
    eventWebPath : null,
    environment : config.ENVIRONMENT,

    eventService : Ember.inject.service("event"),

    didInsertElement() {
      this._super(...arguments);
      if (this.get('autonomous') && this.get('eventWebPath')) {
         this.get('eventService').findByWebpath(this.get("eventWebPath")).then((data) => {
             this.set('data', prepareEvent(data.EventInfoOut[0]));
         });
      }
    },
    
});
