import Ember from 'ember';

export function colorBackground(params/*, hash*/) {
  let [colorNameBase] = params;
  if (colorNameBase && colorNameBase.toLowerCase() == 'white') {
    return "000000";
  } else {
    return "ffffff";
  }
}

export default Ember.Helper.helper(colorBackground);
