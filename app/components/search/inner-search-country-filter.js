import Ember from 'ember';

export default Ember.Component.extend({
    tagName : '',
    countries : null,

    actions : {
        addFilter(event) {
            var value = event.target.getAttribute("data-value");
            //TUTO-DDAU-bubble-up-component(1-component-child-js)
            this.sendAction("sendCountry", value);
        },
    }
});
