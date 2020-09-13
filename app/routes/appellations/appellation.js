import Ember from 'ember';
import BaseRoute from '../base';
import {getUserI18n} from '../../utils/common-utils';

export default BaseRoute.extend({
    appellationService : Ember.inject.service("appellation"),
    titleToken: ['field.appellation'],
    

    model(params) {
        //TODO retrieve user language
        let userLanguage = getUserI18n();
        return this.get('appellationService').findOverview(params.webpath, userLanguage);
    },
    afterModel(model, transition) {
        this.set("titleToken", ['field.appellation', model.appellation.name]);
    },
});
