import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    actions : {
        addWineryFilter (event) {
            let parentNode = event.target.parentNode;
            let value = parentNode.getAttribute("data-value");
            let type = parentNode.getAttribute("data-type");
            let filter = {
                type : type,
                value : value,
            }
            this.sendAction("setWineryCardWineryFilter", filter);
        },
    }
});
