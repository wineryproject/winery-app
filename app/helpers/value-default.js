import Ember from 'ember';

export function valueDefault(params/*, hash*/) {
  let [value, defaultValue] = params;
  if (params.length==0) 
    return "";
  if (params.length==1) 
    return params[0];
  else {
    if (value) {
      return value;
    } else {
      return defaultValue;
    }
  }
}

export default Ember.Helper.helper(valueDefault);
