import Ember from 'ember';

export default Ember.Component.extend({
    autonomous : null,
    grape : null,
    grapeWebPath : null,

    grapeService: Ember.inject.service("grape"),
    didInsertElement() {
      this._super(...arguments);
      if (this.get('autonomous') && this.get('grapeWebPath')) {
         this.get('grapeService').findByWebPath(this.get("grapeWebPath")).then((data) => {//TODO replace by webpath
             this.set('data', data.CepageDescriptionOut[0]);
         });
      }
    },

});
