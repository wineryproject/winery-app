import Ember from 'ember';

export default Ember.Component.extend({
    tagName : '',
    appellations : null,

    actions : {
        addFilter(event) {
            var value = event.target.getAttribute("data-value");
            this.sendAction("sendGrape", value);
        },
    }
});
