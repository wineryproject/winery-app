import Ember from 'ember';

export function pillTitle(params/*, hash*/) {
  let [i18n, number] = params;
  let ret = (number > 0)? i18n+" <span class='label label-success'>"+number+"</span>":i18n;
  return Ember.String.htmlSafe("<h4>"+ret+"</h4>");
}

export default Ember.Helper.helper(pillTitle);
