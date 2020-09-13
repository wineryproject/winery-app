import Ember from 'ember';

export function mailTo(params/*, hash*/) {
  let [emailAddress, label] = params;
  let labelValue = (label)?label:emailAddress;
  var link = '<a href="mailto:' + emailAddress + '">' + labelValue + '</a>';
  return Ember.String.htmlSafe(link);
}

export default Ember.Helper.helper(mailTo);
