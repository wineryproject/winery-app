import Ember from 'ember';

import PayPlanAdapter from '../../adapters/payplans';

export default Ember.Route.extend({
     model(params) {
          
        var adapter = PayPlanAdapter.create();
        return adapter.find(params.payplan_id)
            .then(function(data) {
                data.params = params;
                return data.PayPlanConditionMatrixOut;
                }
            )
            .catch(function(error) {
                console.log("error = "+error);
                //reject(error);
            });
          //https://guides.emberjs.com/v2.14.0/models/
        //return this.get('store').findRecord('payplan', params.payplan_id);
    },
    queryParams: {
        payplanId: {
            replace: true
        }
    }
});
