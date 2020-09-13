import Controller from '@ember/controller';
import { inject } from '@ember/service';

import config from '../config/environment';

export default Controller.extend({

    environment : config.ENVIRONMENT,

    session: inject('session'),
    actions: {
        invalidateSession() {
          this.get('session').invalidate();
        }
    }

});
