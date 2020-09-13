import Ember from 'ember';

export default Ember.Component.extend({
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
