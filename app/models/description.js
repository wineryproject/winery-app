import DS from 'ember-data';

import attr from 'ember-data/attr';

export default DS.Model.extend({
  email: attr('string'),
  entityType: attr('string'),
  entityValue: attr('string'),
  languageCode: attr('string'),
  description: attr('string'),
  ip : attr('ip'),
});
