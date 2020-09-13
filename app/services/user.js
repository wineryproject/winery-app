import Ember from 'ember';

import UserAdapter from '../adapters/user';

export default Ember.Service.extend({

    fetch(email) {
        var adapter = UserAdapter.create(); 
        return adapter.fetch(email);
    },

    fetchCurrentPurchaseOrder(email) {
        var adapter = UserAdapter.create(); 
        return adapter.fetchCurrentPurchaseOrder(email);
    }
});
