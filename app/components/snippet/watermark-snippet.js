import Ember from 'ember';
import { computed } from '@ember/object';

export default Ember.Component.extend({
    tagName : '',
    label : null,
    labelDisplay : computed('label', function() {
        return Ember.String.htmlSafe(`${this.get('label')} <br/><br/>`.repeat(2));
    }) 

});
