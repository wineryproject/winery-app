import DS from 'ember-data';

import attr from 'ember-data/attr';
//import {attr} from '@ember-decorators/data';

export default DS.Model.extend({
    email: attr('string'),
    authorLastName: attr('string'),
    authorFirstName: attr('string'),
    authorAlias: attr('string'),
    authorRightsUrl: attr('string'),
    originUrl: attr('string'),
    originSiteUrl: attr('string'),
    tags: attr('string'),
    category: attr('string'),
    description: attr('string'),
    languageCode : attr('string'),
    ip : attr('string'),
    acceptTermsAndConditions : attr('string'),
});
