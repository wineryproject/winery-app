import Component from '@ember/component';
import { computed } from '@ember/object';

export default Ember.Component.extend({
    tagName: 'li',
    activate : false,
    classNameBindings: ['active'],
    active : computed('activate', function(){
        return this.get('activate');
    }),
    /*
    active: function() {
        return this.get('childViews').anyBy('active');
    }.property('childViews.@each.active')
    */
});
