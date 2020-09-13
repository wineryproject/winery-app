import DS from 'ember-data';

import attr from 'ember-data/attr';

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
    languageCode : attr('languageCode'),
    ip : attr('ip'),
    acceptTermsAndConditions : attr('acceptTermsAndConditions'),
});
