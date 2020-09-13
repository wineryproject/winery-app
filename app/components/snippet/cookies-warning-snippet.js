import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import _ from "lodash";
const { keys } = Object;

export default Component.extend({
    tagName:"",
    hasAcknowledgeCookiesWarning: computed('cookies', function() {
        let cookieService = this.get('cookies');
        let cookies = cookieService.read();
        return cookies.hasAcknowledgeCookiesWarning?cookies.hasAcknowledgeCookiesWarning : false;
      }),
    cookies: service(),
    actions : {
        close () {
            //has acknowledge cookies warning
            this.set("hasAcknowledgeCookiesWarning",true);
            //set this info in a ... cookie
            let cookieService = this.get('cookies');
 //           cookieService.write('now', new Date().getTime());
            cookieService.write('hasAcknowledgeCookiesWarning', true);
/*        
            let cookies = cookieService.read();
            return keys(cookies).reduce((acc, key) => {
              let value = cookies[key];
              acc.push({ name: key, value });
        
              return acc;
            }, []);
            */
        }
    }
});
