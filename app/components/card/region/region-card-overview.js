import Ember from 'ember';

export default Ember.Component.extend({
    //empty for model (filled by route)
    actions : {
       shiftTab (event){
           var tab = event.currentTarget.getAttribute("data-tab");
           $("#"+tab).closest("li").addClass("active").siblings("li").removeClass("active");
           //$("#places").css("tab-pane fade in active");
           
           /*
            $("#category").val(event.srcElement.innerText);
            this.get("model").set("category",event.srcElement.innerText);
            */
        },
    },
});
