import DS from 'ember-data';

export default DS.Model.extend({
  
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  event: attr('string'),
  countryId : attr('int'),
  countryName : attr('string'),
  
  street1 : attr('string'),
  street2 : attr('string'),
  place : attr('string'),
  state : attr('string'),
  postCode : attr('int'),

  from : attr('date'),
  to : attr('date'),

  languageCode : attr('string'),
  description : attr('string'),

});
