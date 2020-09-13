import Ember from 'ember';
import {getUserI18n} from '../../utils/common-utils';
import base from '../../mixins/component-base-mixin';

export default Ember.Component.extend(base, {
    locale : getUserI18n(),
});
