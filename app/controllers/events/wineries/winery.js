import Ember from 'ember';

import { storageFor } from 'ember-local-storage';
import { computed } from '@ember/object';
import _ from 'lodash';

export default Ember.Controller.extend({
    wineryEventCustomerOrder : storageFor("customer-order"),

/*    
    showOrderButton : computed('wineryEventCustomerOrder.[]', function() {
        return this.get("wineryEventCustomerOrder.length")>0;
    }),
*/
    totalPriceDisplay : computed('totalPrice', function() {
        return this.get("totalPrice").toFixed(2);
    }),

    totalPrice : computed('wineryEventCustomerOrder.[]', function() {
        let items = this.get("wineryEventCustomerOrder.content");
        return _.sumBy(items, i => parseFloat(i.total));
    }),

    actions :  {
        printWineryEventPriceList () {
            window.print();
        },
        showSlides () {
            console.log("show slides");
        },
        getCustomerInfo () {
            //check login as the current owner of the winery
            //open camera type for input
            console.log("getCustomerInfo")
        },
        order() {
            //check login as the current owner of the winery
            console.log("order")
        },
        resetOrder() {
            this.get("wineryEventCustomerOrder").clear();
            let currentRoute = Ember.getOwner(this).lookup('controller:application').currentPath;
            Ember.getOwner(this).lookup('route:'+currentRoute).refresh();
        },
    }
});
