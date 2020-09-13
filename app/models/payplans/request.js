import DS from 'ember-data';

//TODO in MP EMBER stack
export default DS.Model.extend({
  
  payPlanId : attr('int'),
  payPlanName : attr('string'),
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  domain: attr('string'),
  countryId : attr('int'),
  countryName : attr('string'),
  
  street1 : attr('string'),
  street2 : attr('string'),
  place : attr('string'),
  state : attr('string'),
  postCode : attr('int'),

  regionId : attr('int'),
  regionName : attr('string'),
  lieuDitId : attr('int'),
  lieuDitName : attr('string'),
  grapeIds : attr('array'),
  grapeNames : attr('array'),
  latitude : attr('long'),
  longitude : attr('long'),
  languageCode : attr('string'),
  description : attr('string'),
  
});
