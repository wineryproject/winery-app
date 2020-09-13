import Ember from 'ember';
import { setFilter } from '../../../utils/common-utils';

export default Ember.Controller.extend({
       //TODO remove duplicated code with /winery/show 
    queryParams: ['caracteristic','grape','color','sweetness','bubbleness','order'],
    caracteristic : null,
    grape : null,
    color : null,
    sweetness : null,
    bubbleness : null,
    order : null,

    actions : {
        setProductFilter (filter) {
            if (filter) {
                setFilter(this, filter, "bubbleness");
                setFilter(this, filter, "sweetness");
                setFilter(this, filter, "grape");
                setFilter(this, filter, "color");
                setFilter(this, filter, "order");
            }
        }
    }

});
