import DS from 'ember-data';
import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;

export default DS.JSONAPIAdapter.extend({
    //baseUrl : baseUrl,
});
