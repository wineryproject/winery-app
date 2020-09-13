import Ember from 'ember';
import BaseRoute from './base';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
//import RouteHistoryMixin from 'ember-route-history/mixins/routes/route-history';

//
const { service } = Ember.inject;
const siteName = "The winery project";
//export default BaseRoute.extend(ApplicationRouteMixin, RouteHistoryMixin, {
export default BaseRoute.extend(ApplicationRouteMixin, {

    i18n: Ember.inject.service(),
    //session: Ember.inject.service(),

    title: function(tokens) {
        if (tokens.length==1) {
            var t = this.get("i18n").t(tokens).toString();
            return t + ' - '+siteName;
        } else if (tokens.length==2) {
            let t = this.get("i18n").t(tokens[0]).toString();
            let s = t + ' ' + tokens[1];
            return s + ' - '+siteName;
        } else if (tokens.length>2) {
            return tokens.join() + ' - '+siteName;
        } else 
            return siteName;
    },
/* normally in BaseRoute
    actions: {
        invalidateSession: function() {
            this.get('session').invalidate();
        }
    }
    */
});
