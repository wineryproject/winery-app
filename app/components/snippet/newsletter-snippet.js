import Ember from 'ember';

import NewsletterAdapter from '../../adapters/newsletter';
import {notifySuccess, notifyFailure} from '../../utils/notification-utils';

export default Ember.Component.extend({

    email : null,
    isSent : false,

    isValidEmail: Ember.computed.match('email', /^.+@.+\..+$/),
    /*isDisabled: Ember.computed('isValidEmail',
        function() {
        return !(this.get('isValidEmail') 
        )
    }),
    */
    isDisabledOnSend: Ember.computed('isSent', 
        function() {
        return this.get('isSent');
    }), 
    isDisabled: Ember.computed('isValidEmail','isDisabledOnSend', 
        function() {
        return (!this.get('isValidEmail') || this.get('isDisabledOnSend'));
    }), 

    actions : {
        request (request) {
            this.set('isSent', true);
            var adapter = NewsletterAdapter.create();
            adapter.requestNewsletter(this.get("email"))
              .then (data => {
                 this.set('isSent', false);
                 this.set("email", "");
                 notifySuccess(this, "notification.newsletter-successfully-requested");
              })
              .catch(x => {
                 this.set('isSent', false);
                 notifyFailure(this, "notification.unexpected-error-processing-request");
                 console.log("error "+x.responseJSON.cause);
              }
            );
        }  
    }
});
