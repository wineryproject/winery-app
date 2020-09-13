//move to https://github.com/kellyselden/ember-i18n-inject
/*
export function initialize(application) {
  application.inject('controller', 'notifications', 'service:i18n');
  application.inject('component', 'notifications', 'service:i18n');
  application.inject('route', 'notifications', 'service:i18n');  
}
*/

export default {
  name: 'i18n',
  after: 'ember-i18n',
  initialize: function(app) {
    app.inject('model', 'i18n', 'service:i18n');
    app.inject('controller', 'i18n', 'service:i18n');
    app.inject('component', 'i18n', 'service:i18n');
    app.inject('route', 'i18n', 'service:i18n');
    //let i18n = container.lookup('service:i18n');
    //i18n.set('locale', calculateLocale(i18n.get('locales')));
  }
 /* */
};
