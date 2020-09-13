import Ember from 'ember';
import config from '../../../config/environment';

export default Ember.Component.extend({
    tagName:'',
    environment : config.ENVIRONMENT,
    actions :  {
        setWineCardProductFilter (filter) {
            this.sendAction("forwardFromWineCardList", filter);
        },
    }
});
