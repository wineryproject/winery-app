import Ember from 'ember';

export default Ember.Component.extend({
    regionService: Ember.inject.service("region"),
    availableRegions: null,
    selectedRegion : null,
    countryId : null,
    
    actions: {
      select(region) {
         this.set('selectedRegion', region);
         this.attrs.onSelectRegion(region);
      }
    },
    /*
    didInsertElement() {
        this._super(...arguments);
        var countryId = this.get("countryID");
        //setRegions(countryId);
        
        if (countryId) {
            this.get('regionService').availableRegionsForCountry(countryId).then((data) => {
            this.set('availableRegions', data.RegionListOut);
            });
        }
        
    },
    */
    didUpdateAttrs() {
        this._super(...arguments);
        this.set('selectedRegion', null);
        //setRegions(this.get("countryID"));
        var countryId = this.get("countryID");
        if (countryId) {
            this.get('regionService').availableRegionsForCountry(countryId).then((data) => {
            this.set('availableRegions', data.RegionListOut);
            });
        }/**/
    },
});

//TUTO make setRegions works call methods in component
function setRegions(countryId) {
        if (countryId) {
            
            this.get('regionService').availableRegionsForCountry(countryId).then((data) => {
            this.set('availableRegions', data.RegionListOut);
            });
        }
}
