import { helper } from '@ember/component/helper';

import { toWebPath } from '../utils/common-utils';

export function formatToWebPath(params/*, hash*/) {

  let [param] = params;
  return toWebPath(param);
  /*
  if (param) {
    return param.trim().toLowerCase().split(' ').join('-');
  } else {
    return "";
  }
  */
}

export default helper(formatToWebPath);
