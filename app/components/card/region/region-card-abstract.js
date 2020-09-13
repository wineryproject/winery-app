import Ember from 'ember';
import {prepareRegion} from '../../../utils/winery-utils'

export default Ember.Component.extend({

    autonomous : null,
    region : null,
    regionWebPath : null,

    regionService: Ember.inject.service("region"),
    didInsertElement() {
      this._super(...arguments);
      if (this.get('autonomous') && this.get('regionWebPath')) {
        this.get('regionService').find(this.get("regionWebPath")).then((data) => {//TODO replace by webpath
            let region = data.RegionBadgeOut[0];
            prepareRegion(region);
            this.set('region', region);
        });
      }
    },
});
