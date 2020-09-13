import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  email: attr('string'),
  category: attr('string'),
  comment: attr('string'),
  origin: attr('string'),
  languageCode : attr('languageCode'),
  ip : attr('ip'),
});
