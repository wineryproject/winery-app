//info/images-info
import Ember from 'ember';
import base from '../../mixins/component-base-mixin';
import {prepareImagesInfo} from '../../utils/business-utils';

export default Ember.Component.extend(base, {
    tagName : '',
    //is automonous => load from entity, entity WebPath, language 
    autonomous : null,
    
    entity : null,
    entityWebPath : null,

    data : null,
    pagination: false,

    infoService : Ember.inject.service("info"),
    didInsertElement() {
      this._super(...arguments);
      let entity = this.get('entity');
      let entityWebPath = this.get('entityWebPath');
      if (entity && entityWebPath) {
        this.get('infoService').findImagesInfo(entity, entityWebPath)
            .then((data) => {//TODO replace by webpath
                this.set('data', prepareImagesInfo(data.ImageInfoOut));
                this.set('pagination', data.ImageInfoOut.length>1);
        });
        /*
        this.get('infoService').findCountryImagesInfo(entityWebPath)
            .then((data) => {//TODO replace by webpath
                var crImages = prepareImagesInfo(data.countryRegions.ImageInfoOut);
                this.set('data', crImages);
                this.set('pagination', crImages.length>1);
        });
        */
      }
    },
});
