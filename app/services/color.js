import Service from '@ember/service';

import ColorAdapter from '../adapters/color';
import {getColorsInfo} from '../utils/common-utils';

export default Service.extend({
    //distinctColorPerAppellation
    distinctColorPerAppellation() {
        var adapter = ColorAdapter.create(); 
        return adapter.distinctColorPerAppellation();
    },
    distinctColorPerGrape() {
        var adapter = ColorAdapter.create(); 
        return adapter.distinctColorPerGrape();
    },
    distinctColorPerProduct() {
        var adapter = ColorAdapter.create(); 
        return adapter.distinctColorPerProduct();
    },
    store() {
        getColorsInfo();
    },
    /*
    getColorInfo() {
        var adapter = ColorAdapter.create(); 
        return adapter.getColorInfo();
    },
*/
});
