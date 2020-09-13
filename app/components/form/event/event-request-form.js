import Ember from 'ember';

import PostEntityAdapter from '../../../adapters/post-entity';
import {notifySuccess, notifyFailure} from '../../../utils/notification-utils';

export default Ember.Component.extend({

  tagName : '',
    
  isValidEmail: Ember.computed.match('model.email', /^.+@.+\..+$/),
  isValidFirstName : Ember.computed.gte('model.firstName.length', 2),
  isValidLastName : Ember.computed.gte('model.lastName.length', 2),
  isValidEvent : Ember.computed.gte('model.event.length', 5),
  isValidDescription : Ember.computed.gte('model.description.length', 5),

  isDisabled: Ember.computed('isValidEmail',
                             'isValidFirstName', 
                             'isValidLastName', 
                             'isValidDescription',
                             'isValidEvent',
    function() {
      return !(this.get('isValidEmail') 
               && this.get('isValidFirstName') 
               && this.get('isValidLastName')
               && this.get('isValidEvent')
               && this.get('isValidDescription')
               )
  })
  ,isSent : false
  
  ,actions : {
    request (request) {
        this.set('isSent', true);
        var adapter = PostEntityAdapter.create();
        adapter.requestEvent(this.get("model"))
          .then (data => {
             this.set('isSent', false);
             notifySuccess(this, "notification.event-successfully-requested");
          })
          .catch(x => {
             this.set('isSent', false);
             notifyFailure(this, "notification.unexpected-error-processing-request");
             console.log("error "+x.responseJSON.cause);
          });
     }  
  }
});
