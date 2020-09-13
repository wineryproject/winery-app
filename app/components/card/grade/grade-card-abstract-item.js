import Ember from 'ember';

export default Ember.Component.extend({

    autonomous : null,
    grade : null,
    gradeWebPath : null,

    gradeService: Ember.inject.service("grade"),
    didInsertElement() {
      this._super(...arguments);
      if (this.get('autonomous') && this.get('gradeWebPath')) {
         this.get('gradeService').findByWebPath(this.get("gradeWebPath")).then((data) => {//TODO replace by webpath
             this.set('data', data.CepageDescriptionOut[0]);
         });
      }
    },

});
