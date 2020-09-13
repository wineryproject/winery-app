import Ember from 'ember';
import BaseRoute from '../base';
import PayPlanAdapter from '../../adapters/payplans';

export default BaseRoute.extend({
    //templateName: 'payplans/request',
    // DOC http://emberjs.jsbin.com/titabaxe/3/edit?html,css,js,output
      myParams : [],
      /* DOES NOT work the second time : keeps always first param value at hbs level myParams.payplan_id} always
         display free or intermediate 
         DOES work when return something
         */
      model(params) {
          //var request = this.store.createRecord('request');
          this.set('myParams', params);
            var adapter = PayPlanAdapter.create();
            //TODO find local store use : model to improve
            return adapter.findAll()
            .then(function(data) {
                //request.setProperties({ PayPlanConditionMatrixOut: data.PayPlanConditionMatrixOut });
                //TODO check if those props can be removed?
                return {
                    payplan : data.PayPlanConditionMatrixOut
                    ,email : ""
                    ,firstName : ""
                    ,lastName : ""
                    ,description : ""
                    
                };
                }
            )
            .catch(function(error) {
                console.log("error = "+error);
            });
      },
      setupController(controller, model) {
        // Call _super for default behavior
        this._super(controller, model);
        // Implement your custom setup after
        controller.set('myParams', this.get('myParams'));
      },
      actions: {
        request (s) {
            alert (s);
        }
      }
});
