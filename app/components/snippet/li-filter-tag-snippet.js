import Ember from 'ember';

import { computed } from '@ember/object';

export default Ember.Component.extend({
    tagName : '',
    styleHighlight : false,
    tagClass : computed ('styleHighlight', function() {
        return this.get("styleHighlight")?"filter-tag w-font-bold":"filter-tag";
    }),
    badgeClass : computed ('styleHighlight', function() {
        return this.get("styleHighlight")?"label-success":"label-default";
    }),
    backgroundClass : computed ('styleHighlight', function() {
        return this.get("styleHighlight")?"w-background-gray":"";
    }),
    filterAction : 'addProductFilter',
    actions : {
        forwardActionFilter (event) {
            this.sendAction ("forwardActionFilter", event);
        }
    }
});
