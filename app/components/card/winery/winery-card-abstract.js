import Ember from 'ember';

/*
* independent by not reusable by other data than self fetched
*/
export default Ember.Component.extend({

    data : {},
    entityId : null,
    winery: Ember.inject.service(),
    didInsertElement() {
      this._super(...arguments);
      //TUTO component load data 
      //TUTO REF https://emberigniter.com/render-promise-before-it-resolves/
      let entityId = this.get('entityId');
      this.get('winery').wineryAbstract(entityId).then((data) => {
          var dataReturned = data.WineryPublicOut[0];
          dataReturned.firstPicture = dataReturned.pictureIds?dataReturned.pictureIds.split()[0]:"";
          this.set('data', dataReturned);
      });
    },
    didReceiveAttrs() {
          //TUTO passing data from template to component {{card/winery/winery-card-abstract data=result}}
          let data = this.get('data');
          this.set("entityId", data.entityId);
    }

});
