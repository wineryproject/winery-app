import Ember from 'ember';
import { getColor } from "../utils/common-utils";

export function colorToRgb(params/*, hash*/) {
  let [color] = params;
  return getColor(color);
}

export default Ember.Helper.helper(colorToRgb);