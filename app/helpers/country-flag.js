import Ember from 'ember';
import { getFlagIcon } from "../utils/common-utils";
import { formatToWebPath } from "./format-to-web-path";

export function countryFlag(params/*, hash*/) {
  return getFlagIcon(formatToWebPath(params));
}

export default Ember.Helper.helper(countryFlag);
