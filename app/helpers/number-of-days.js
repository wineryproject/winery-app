import Ember from 'ember';

export function numberOfDays(params/*, hash*/) {
  var diff = Math.abs(Date.now() - new Date(params));
  return diff / (1000 * 60 * 60 * 24);
}

export default Ember.Helper.helper(numberOfDays);
