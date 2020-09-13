import Ember from 'ember';
 
export default Ember.Component.extend({
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