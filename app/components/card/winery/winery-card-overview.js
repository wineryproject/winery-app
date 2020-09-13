import Ember from 'ember';
import {getCurrentUrlEnding} from '../../../utils/common-utils';
import base from '../../../mixins/component-base-mixin';
import Component from '@ember/component';

export default Component.extend(base, {

    tabProducts : 'active',
    tabProductItemPrice : '',
    tabEvent : '',
    origin : "",
    data : null,
    init()
    {
        this._super(...arguments);
        this.set("origin", getCurrentUrlEnding());
        let data = this.get("data");
        if (data.products.length > 0) {
            this.set("tabProducts", 'active');
        } else if (data.productItemPrices.length > 0) {
            this.set("tabProductItemPrice", 'active'); 
        } else if (data.events.length > 0) {
            //this.set("tabEvent", 'active'); 
            //TODO fix presentation issue with no country found when autonomous load of event card
        }
    }    
    ,actions : {
        setWineryOverviewFilter (filter) {
            this.sendAction("setWineryProductFilter", filter);
        }
    },
 
});

