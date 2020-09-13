import Ember from 'ember';

import PostEntityAdapter from '../adapters/post-entity';
import Feedback from '../models/feedback';

import BaseController from './base';
import {notifySuccess, notifyFailure} from '../utils/notification-utils';

export default BaseController.extend({

  queryParams: ['origin'],
  origin : null,

//TUTO simple computed value
  isValidEmail: Ember.computed.match('model.email', /^.+@.+\..+$/),
  isValidCategory : Ember.computed.gte('model.category.length', 2),
  isValidFreeComment : Ember.computed.notEmpty('model.comment'),

  isSent : false,

//TUTO nested computed value
  isDisabledOnAttribute: Ember.computed('isValidFreeComment','isValidEmail', 'isValidCategory', 
    function() {
      return !(this.get('isValidFreeComment') && this.get('isValidEmail') && this.get('isValidCategory'));
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
    handleOption (event){ 
        //TUTO DOM manipulation with jQuery
        $("#category").val(event.srcElement.innerText);
        this.get("model").set("category",event.srcElement.innerText);
     },
     feedback (newFeedback) {
        this.set('isSent', true);
        if (this.get("origin")) {
          this.set("model.origin",this.get("origin"));
        }
        var adapter = PostEntityAdapter.create(); 
        adapter.feedback(this.get("model"))
        .then (data => {
          notifySuccess(this, "notification.feedback-submitted");
          //reset model
          //DOES NOT work 2nd time this.set("model", {});
          //DOES NOT work at all this.set("model", Feedback.create());
          this.set('isSent', false);
          this.set("model.email", "");
          this.set("model.category", "");
          this.set("model.comment", "");
        })
        .catch (data => {
          notifyFailure(this, "notification.error");
          this.set('isSent', false);
        });
     }
  }

});
