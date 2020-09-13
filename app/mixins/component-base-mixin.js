import Ember from 'ember';
//mixin https://dockyard.com/blog/2015/11/09/best-practices-extend-or-mixin
//https://spin.atomicobject.com/2016/06/06/ember-scroll-to-top/
import config from '../config/environment';
const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;
import ENV from '../config/environment';

export default Ember.Mixin.create({
    baseUrl:baseUrl,
    rootUrl:host,
    imageUrl:host+"/images",
    environment:config.ENVIRONMENT,
});
