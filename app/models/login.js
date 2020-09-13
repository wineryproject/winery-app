import DS from 'ember-data';

import { attr } from 'ember-model';
export default DS.Model.extend({
  identifier: attr('string'),
  password: attr('string'),
});
