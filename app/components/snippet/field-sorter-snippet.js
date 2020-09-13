import Ember from 'ember';
import _ from 'lodash';

export default Ember.Component.extend({
    order:null,
    key : null,
    d:Ember.computed('order','name', function() {
        let order = this.get("order");
        let key = this.get("key");
        return _.find(order, {'name':key});
    }),
    actions : {
        forwardActionSorter (event) {
            //remove duplicate code with product-filter.js (addProductFilter)
            let parentNode = event.target.parentNode;
            let value = parentNode.getAttribute("data-value");
            let type = parentNode.getAttribute("data-type");
            let filter = {
                type : type,
                value : value,
            }
            this.sendAction("setWineCardProductSorter", filter);
        }
    }
});
