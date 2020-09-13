import Service from '@ember/service';
import { inject } from '@ember/service';
import config from '../config/environment';
import {getUserI18n} from '../utils/common-utils';

const { host, namespace } = config.DS;
const PATH_ROOT = host+'/'+namespace+'/data/locales/';

export default Service.extend({
  i18n: inject(),
  ajax: inject(),

  fetch() {
    let loc = getUserI18n();
    return fetchLocal(this, loc);
  },

/*
  _addTranslationsFull(json) {
    const i18n = this.get('i18n');
    Object.keys(json).forEach((locale) => {
      i18n.addTranslations(locale, json[locale]);
    });
  },
 */

  _addTranslations(json, loc) {
    const i18n = this.get('i18n');
    i18n.addTranslations(loc, json);
    this.set('i18n.locale',loc);
  }
  
});

function fetchLocal(_this, loc) {
    let path = PATH_ROOT + loc + "/module";
    return _this.get('ajax').request(path).then(data=>{
      _this._addTranslations(data,loc);
    }
      
    );
}
