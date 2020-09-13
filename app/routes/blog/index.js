import Ember from 'ember';

import BaseRoute from '../base';

export default BaseRoute.extend({
    titleToken: ['nav.blog'],
	newsletterService : Ember.inject.service("newsletter"),
	model(params) {
        return this.get('newsletterService').blogList(params) ;
    },
});
