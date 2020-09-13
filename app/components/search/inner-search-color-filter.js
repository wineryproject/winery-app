import Component from '@ember/component';

export default Component.extend({
    tagName : '',
    colors : null,

    actions : {
        addFilter(event) {
            var value = event.target.getAttribute("data-value");
            this.sendAction("sendColor", value);
        },
    }
});
