import Ember from 'ember';
import {getUserI18n} from '../../../utils/common-utils';
export default Ember.Component.extend({
    locale : getUserI18n(),
});

/*
import Ember from 'ember';
import {getUserI18n} from '../utils/common-utils';

export default Ember.Component.extend({
    locale : getUserI18n(),
});
*/
