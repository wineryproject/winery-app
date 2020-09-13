import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
    grape: inject(),

    availableGrades: null,
    selectedGrades: null,

    regionId:null,
    
    actions: {
      select(grape) {
         this.set('selectedGrades', grape);
         this.onSelectGrades(grape);
      }
    },
    didInsertElement() {
        this._super(...arguments);
        var regionId = this.get("regionId");
        if (regionId) {
            this.get('grape').availableGrapesForRegion(regionId).then((data) => {
            this.set('availableGrades', data.ProposedCepageForRegionOut);
            });
        }
    },
    /*didReceiveAttrs() {
        //TUTO passing data from template to component {{form/input-grade regionID=regionId}}
        //TUTO-QUESTION how to know if it is a class var or attribute??
        let regionId = this.get('regionID');
        this.set("regionId", regionId);
    },*/
     didUpdateAttrs() {
        this._super(...arguments);
        this.set('selectedGrades', null);
        var regionId = this.get("regionId");
        if (regionId) {
            this.get('grape').availableGrapesForRegion(regionId).then((data) => {
            this.set('availableGrades', data.ProposedCepageForRegionOut);
            });
        }
    },
});
