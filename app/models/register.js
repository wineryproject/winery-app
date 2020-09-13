import DS from 'ember-data';
import { attr } from 'ember-model';
export default DS.Model.extend({
  email: attr('string'),
  username: attr('string'),
  password: attr('string'),
  languageCode: attr('string'),
  agreeWithTermOfConditions: attr('boolean'),
});
