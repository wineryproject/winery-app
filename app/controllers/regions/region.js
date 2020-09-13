import Ember from 'ember';

export default Ember.Controller.extend({
    anchorQueryParam: 'custom',
    queryParams: ['custom'],
    custom: 'places',
    actions : {
       shiftTab (event){
           /*
            $("#category").val(event.srcElement.innerText);
            this.get("model").set("category",event.srcElement.innerText);
            */
        },
    },
});
