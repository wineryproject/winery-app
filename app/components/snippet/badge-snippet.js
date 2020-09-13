import Ember from 'ember';
import { computed } from '@ember/object'; 
import { htmlSafe } from '@ember/string';

export default Ember.Component.extend({
    tagName : '',
    
    color : '',
    textColor:null,
    colorClass : '',
    //TODO refactor with ember 3.4 fonctionality
    myColor: computed('color', 'textColor', function() {
        let color = this.get('color');
        let textColor = this.get('textColor');
        if (textColor) {
            //return Ember.String.htmlSafe("background-color : #"+this.get('color') + "; color : #"+this.get('textColor'));
            return htmlSafe(
                `background-color : #${color}; color : #${textColor}`
            );
        
        }
        return htmlSafe(`background-color : #${color}`);
    }),

});
