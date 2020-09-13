import { helper } from '@ember/component/helper';
import _ from 'lodash';

const payplanType = [
  {type :'free', panel :'panel-grey', btn:'btn-default'},
  {type :'intermediate', panel :'panel-blue', btn:'btn-primary'},
  {type :'pro', panel :'panel-green', btn:'btn-success' }
];

export function payplanClass(params/*, hash*/) {
  let [payplan_id, domElement] = params;
  return _.map(_.filter(payplanType, {'type':payplan_id}), domElement)[0];
}

export default helper(payplanClass);
