import Controller from '@ember/controller';
import config from '../config/environment';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
const { keys } = Object;

export default Controller.extend({
    queryParams: ['anc'],
    anc: 'first',
    ribbonLabel : config.ENVIRONMENT_RIBBON,

    cookies: service(),

    allCookies: computed(function() {
      let cookieService = this.get('cookies');
      cookieService.write('now', new Date().getTime());
  
      let cookies = cookieService.read();
      return keys(cookies).reduce((acc, key) => {
        let value = cookies[key];
        acc.push({ name: key, value });
  
        return acc;
      }, []);
    })
});
