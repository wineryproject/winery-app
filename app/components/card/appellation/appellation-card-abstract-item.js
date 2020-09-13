import Ember from 'ember';
import _ from 'lodash';
import {convertComposition} from '../../../utils/business-utils';

export default Ember.Component.extend({
    tagName:'',
    //TODO use typescript + generic to remove redundancy with region and other 'route entities' on autonomous mode
    autonomous : null,
    data : null,
    appellationWebPath : null,

    appellationService: Ember.inject.service("appellation"),
    didInsertElement() {
      this._super(...arguments);
      if (this.get('autonomous') && this.get('appellationWebPath')) {
        this.get('appellationService').find(this.get("appellationWebPath")).then((data) => {//TODO replace by webpath
            let item = data.AppelationBadgeOut[0];
            convertComposition(item);
            this.set('data', item);
        });
      }
    }

});

/*
export function convertComposition(appellation) {
    let composition = appellation.composition?appellation.composition.split(','):[];
    let compositionArr = [];
    _.each(composition, function (e) {
        let element = e.split('|');
        let jsonElement = {grade : element[0], webPath : element [1], percent : element[2], operator : element[3]};
        compositionArr.push(jsonElement);
    });
    appellation.composition = composition?compositionArr:composition;
    appellation.isToDisplay=true;
}
*/