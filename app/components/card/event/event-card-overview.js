import Ember from 'ember';
import config from '../../../config/environment';

export default Ember.Component.extend({
    environment : config.ENVIRONMENT,
    requestEventInvitationModal : false,
    requestEventFeePresaleModal : false,

    actions : {
        forwardToEventCardOverview (filter) {
            this.sendAction("forwardFromEventCardOverview", filter);
        },
        requestEventInvitation() {
            this.set('requestEventInvitationModal', true);
        },
        requestEventFeePresale () {
            this.set('requestEventFeePresaleModal', true);
        },
        addToCal() {
            console.log('addToCal!!')
        }

    }
});
