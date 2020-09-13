import Ember from 'ember';

export default Ember.Component.extend({
    tagName:'',
    actions : {
        setWineCardTabListFilter(filter) {
            this.sendAction("setWineryOverviewFilter", filter);
        }
    }
});
