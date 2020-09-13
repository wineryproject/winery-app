import Ember from 'ember';

export function i18nDefault(params/*, hash*/) {
  let [i18n, defaultValue] = params;
  if (i18n && !i18n.string && i18n.startsWith("Missing translation"))
    return defaultValue;
  else 
    return i18n;
}

export default Ember.Helper.helper(i18nDefault);
