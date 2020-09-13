import Ember from 'ember';
import { computed } from '@ember/object';

export default Ember.Component.extend({
    tagName : '',
    data : 0,
    upColor : "green",
    downColor : "red",
    evenColor : "black",
    magnitude : 1,
    class: computed('data', function() {
        let d = this.get('data');
        let upColor = this.get('upColor');
        let downColor = this.get('downColor');
        let evenColor = this.get('evenColor');
        if (d > 0)
            return "fa fa-arrow-up arrow-"+upColor;
        if (d == 0)
            return "fa fa-minus arrow-"+evenColor;
        if (d < 0)
            return "fa fa-arrow-down arrow-"+downColor;
      }),

});
