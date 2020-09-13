import Ember from 'ember';
import { computed } from '@ember/object';
import { getFlagIcon, getGrapeColor } from '../../utils/common-utils'

export default Ember.Component.extend({
    tagName: '',
    country : null,
    grape : null,
    //countriesInfo: storageFor('countries'),
    countryFlag : computed('country', function() {
        return getFlagIcon(this.get('country'));
    }),
    grapeColor : computed('grape', function() {
        return getGrapeColor(this.get('grape'));
    }),
});
