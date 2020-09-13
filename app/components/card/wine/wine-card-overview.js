import Ember from 'ember';
import {getCurrentUrlEnding} from '../../../utils/common-utils';
import base from '../../../mixins/component-base-mixin';

export default Ember.Component.extend(base, {

//TODO current url ending aware common with winery-card-overview (see how to extends)
    origin : "",
    init()
    {
        this._super(...arguments);
        //FREE-ACCESS-WINERY 1
        //this.set("origin", getCurrentUrlEnding())
    }   
//END common code
});
