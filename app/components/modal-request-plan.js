import Ember from 'ember';

export default Ember.Component.extend({

/*
  show: function() {
    this.$('.modal').modal().on('hidden.bs.modal', function() {
      this.sendAction('close');
    }.bind(this));
  }.on('didInsertElement'),
  */
  actions: {
    doSave(d, meta) {
      //d.reject(); 
      d.resolve();
    },
    doAfterClose() {
      // 
    },
    doClose(d) {
      if(confirm('Please confirm...')) {
        d.resolve();
      } else {
        d.reject();
      }
    }
  }
});