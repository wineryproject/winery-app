import Ember from 'ember';
import BaseRoute from '../base';
import PayPlanAdapter from '../../adapters/payplans'

export default BaseRoute.extend({
    payplanModal: false,
    model() {
        var adapter = PayPlanAdapter.create();
        return adapter.findAll()
            .then(function(data) {
                return data.PayPlanConditionMatrixOut;
                }
            )
            .catch(function(error) {
                console.log("error = "+error);
                //reject(error);
            });
    },
    actions: {
        /*
        Modal action do not goes there!!! but in controller
        request() {
            this.set('payplanModal', !this.get('payplanModal'));
        }
        */
    }
});
