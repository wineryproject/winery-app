import Ember from 'ember';

import PostEntityAdapter from '../adapters/post-entity';
import Description from '../models/description';

import BaseController from './base';
import {notifySuccess, notifyFailure} from '../utils/notification-utils';

export default BaseController.extend({

/*TODO use ember validation */
  isValidEmail: Ember.computed.match('model.email', /^.+@.+\..+$/),
  isValidDescription : Ember.computed.gte('model.description.length', 20),

  isSent : false,
  isDisabledOnAttribute: Ember.computed('isValidDescription','isValidEmail',
  function() {
    return !(this.get('isValidDescription') && this.get('isValidEmail'));
  }),
  isDisabledOnSend: Ember.computed('isSent', 
    function() {
      return this.get('isSent');
  }), 
  isDisabled: Ember.computed('isDisabledOnAttribute','isDisabledOnSend', 
    function() {
      return (this.get('isDisabledOnAttribute') || this.get('isDisabledOnSend'));
  }),
  actions : {
    selectLanguage (language) {
      this.set("selectedLanguage", language);
      this.set("model.languageCode", language.code);
    },
     sendDescription (description) {
        this.set('isSent', true);
        if (this.get("origin")) {
          this.set("model.origin",this.get("origin"));
        }
        var adapter = PostEntityAdapter.create(); 
        adapter.sendDescription(this.get("model"))
        .then (data => {
          notifySuccess(this, "notification.description-submitted");
          //reset model
          //DOES NOT work 2nd time this.set("model", {});
          //DOES NOT work at all this.set("model", Feedback.create());
          this.set('isSent', false);
          this.set("model.email", "");
          this.set("model.languageCode", "");
          this.set("model.description", "");
          
        })
        .catch (data => {
          notifyFailure(this, "notification.error");
        });
        //newFeedback.save().then(() => this.transitionTo('payplans'));
     }, 
  }
});
