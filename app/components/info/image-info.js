//info/image-info
import Ember from 'ember';
import base from '../../mixins/component-base-mixin';


export default Ember.Component.extend(base, {
    tagName : '',
    //is automonous => load from entity, entity WebPath, language 
    autonomous : null,
    
    entityId : null,
    entityWebPath : null,
    displayOrder : null,

    data : null,

    infoService : Ember.inject.service("info"),
    didInsertElement() {
      this._super(...arguments);
      if (this.get('autonomous') && this.get('entityId') && this.get('entityWebPath') && this.get('displayOrder')) {
        this.get('infoService').findImageInfo(this.get('entityId'), this.get('entityWebPath'), this.get('displayOrder')).then((data) => {//TODO replace by webpath
            this.set('data', data.ImageAuthorOut[0]);
        });
      }
    },
});
