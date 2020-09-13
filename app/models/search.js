import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  filter: attr('string'),
  freeText: attr('string'),
  language: attr('string'),
  longitude: attr('long'),
  latitude: attr('long'),

});
