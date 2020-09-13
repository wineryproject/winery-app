import Ember from 'ember';

export function i18nRef(params/*, hash*/) {
  let [i18nRootLabel, v] = params;
  if (v && (typeof v === 'string' || v instanceof String)) {
    return i18nRootLabel+v.toLowerCase();
  } else {
    return i18nRootLabel+v;
  }
}

export default Ember.Helper.helper(i18nRef);
