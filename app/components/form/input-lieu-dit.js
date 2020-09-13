import Ember from 'ember';

export default Ember.Component.extend({
    placeService: Ember.inject.service("place"),
    availableLieuDits: null,
    selectedLieuDit : null,
    lieuDitId : null,
    
    actions: {
      select(lieuDit) {
         this.set('selectedLieuDit', lieuDit);
         this.attrs.onSelectLieuDit(lieuDit);
      }
    },
    didUpdateAttrs() {
        this._super(...arguments);
        this.set('selectedLieuDit', null);
        var regionId = this.get("regionId");
        if (regionId) {
            this.get('placeService').availableLieuDitsForRegion(regionId).then((data) => {
            this.set('availableLieuDits', data.LieuDitListOut);
            });
        }
    },
});

//TUTO make setRegions works call methods in component
function setLieuDits(regionId) {
    if (regionId) {
        this.get('placeService').availableLieuDitsForRegion(regionId).then((data) => {
        this.set('availableLieuDits', data.LieuDitListOut);
        });
    }
}