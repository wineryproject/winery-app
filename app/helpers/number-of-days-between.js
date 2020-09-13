import Ember from 'ember';

export function numberOfDaysBetween(params/*, hash*/) {
  let [d1, d2] = params;
  var diff = Math.abs(d1.getTime() - d2.getTime());
  return diff / (1000 * 60 * 60 * 24);
}

export default Ember.Helper.helper(numberOfDaysBetween);
