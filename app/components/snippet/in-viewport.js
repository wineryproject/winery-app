import Component from '@ember/component';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, {
    number : 1,
    data : "",

    didEnterViewport() {
        //TODO when entering viewport if not first
        // then push the next set of data to screen
        let nb = this.get("number");
        let data = this.get("data");
        console.log('entered '+nb);
        console.log('data '+data);
        this.sendAction("nextInViewport",nb);
    },
    
    didExitViewport() {
        let nb = this.get("number");
        console.log('exited '+nb);
    },

    didScroll(direction) {
        console.log(direction); // 'up' || 'down' || 'left' || 'right'
    },
    
    actions :  {
        nextInViewport(page) {
            console.log('component nextInViewport load ... '+page);
        }
    }
});
