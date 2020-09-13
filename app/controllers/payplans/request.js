import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['payplanId2'] //TUTO for passing param http://localhost:4200/payplans/free?payplanId2=qsfd
  ,payplanId2: null
  ,myParams : null
/* move to upper controller ie payplans does not work */
/* computed value cannot have argument use helper instead */
  ,panelClassName : Ember.computed("payplan_id", function() {
      return 'panel-grey';
  }),

  actions : {
    selectCountry(country) {
      alert(country);
    } ,
    request (s) {
      alert (s);
    },
    onSelectCountry(country) {
     alert('action received');
   }
  }
});
