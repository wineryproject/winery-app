import Ember from 'ember';

export default Ember.Controller.extend({

    payplanValue:null,
    payplanModal: false,
    payplanTitle : Ember.computed('payplanValue',function() {
      return this.get('payplanValue')+' Payplan';
    }),
    /*queryParams: {
      payplanId: {
        replace: true
      }
    },*/
    actions: {
      request(value) {
          this.set('payplanValue', value);
          this.set('payplanModal', !this.get('payplanModal'));
      }
      
    }
    
      ,panelClassName : Ember.computed("payplan_id", function() {
      return 'panel-grey';
  })
});
