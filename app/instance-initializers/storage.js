export function initialize( appInstance /**/) {
  // appInstance.inject('route', 'foo', 'service:foo');
  let countryService = appInstance.lookup('service:country');
  let grapeService = appInstance.lookup('service:grape');
  let colorService = appInstance.lookup('service:color');
  countryService.store();
  grapeService.store();
  colorService.store();
}

export default {
  name: 'storage',
  initialize
};
