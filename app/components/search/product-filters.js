import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    actions : {
        addProductFilter (event) {
            let parentNode = event.target.parentNode;
            let value = parentNode.getAttribute("data-value");
            let type = parentNode.getAttribute("data-type");
            let filter = {
                type : type,
                value : value,
            }
            this.sendAction("setWineCardProductFilter", filter);
        },
    }
});
