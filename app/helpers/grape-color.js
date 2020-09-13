import Ember from 'ember';
import { getGrapeColor } from "../utils/common-utils";

export function grapeColor(params/*, hash*/) {
  let [grape] = params;
  return getGrapeColor(grape);
}

export default Ember.Helper.helper(grapeColor);
