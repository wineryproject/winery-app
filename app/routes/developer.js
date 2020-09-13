import Ember from 'ember';
import DeveloperAdapter from '../adapters/developer'

export default Ember.Route.extend({

    model(params) {
        var adapter = DeveloperAdapter.create();
        return adapter
            .findAll()
            .then(function(data) {
                return {
                    serverRootInfo : data.SystemInfoOut[0].paramValue ,
                    sitePublicApi : data.SystemInfoOut[1].paramValue ,
                    sitePublicApiSampleClient : data.SystemInfoOut[2].paramValue
                };
            }
            )
            .catch(function(error) {
                console.log("error = "+error);
            });
    }

});
