// app/authenticators/jwt.js  
// https://www.thegreatcodeadventure.com/jwt-authentication-with-rails-ember-part-i-rails-knock/
// https://www.thegreatcodeadventure.com/jwt-authentication-with-rails-ember-part-ii-custom-ember-simple-auth/
// https://github.com/ember-cli/ember-ajax/issues/319
import Ember from 'ember';  
import Base from 'ember-simple-auth/authenticators/base';  
import config from '../config/environment';
import { storageFor } from 'ember-local-storage';

const { host, namespace } = config.DS;
const baseUrl = host+"/"+namespace;
const { RSVP: { Promise }, $: { ajax }, run } = Ember;

export default Base.extend({
  tokenEndpoint: `${baseUrl}/data/jwt/auth`, //OK
  tokenJwt : storageFor("tokenJwt"),
  restore(data) {
    return new Promise((resolve, reject) => {
      if (!Ember.isEmpty(data.token)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate(creds) {
    const { identification, password } = creds;
    const data = {
        login: identification,
        password:password,
    };
    const requestOptions = {
        url: this.tokenEndpoint,
        type: 'POST',
        data,
        mode : 'cors',
    };
    //https://github.com/simplabs/ember-simple-auth/issues/1618
    return new Promise((resolve, reject) => {
      ajax(requestOptions).then((response) => {
        const jwt = response;
        run(() => {
          resolve({
            token: jwt,
            userInfo : jwt,//TODO Add userInfo
          });
          
        });
      }, (error) => {
        run(() => {
          reject(error);
        });
      });
    });
  },
  invalidate(data) {
    return Promise.resolve(data);
  }
});