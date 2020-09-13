import Ember from 'ember';
import { set } from '@ember/object';
import { setFilter } from '../../utils/common-utils';

export default Ember.Controller.extend({
 
    queryParams: ['caracteristic','grape','color','sweetness','bubbleness','order'],
    caracteristic : null,
    grape : null,
    color : null,
    sweetness : null,
    bubbleness : null,
    order : null,

    actions :  {
        setWineryProductFilter (filter) {
            // TODO add grape to the already present ones, (if all selected remove)
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
