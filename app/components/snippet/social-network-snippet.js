import Ember from 'ember';
import { computed } from '@ember/object';
import config from '../../config/environment';

export default Ember.Component.extend({

    environment : config.ENVIRONMENT,
    tagName :'',
    addCode : false,
    addPdf:false,
    isCodeEnabled : computed('addCode', function(){
        return this.get('addCode');
    }),
    isPdfEnabled : computed('addPdf', function(){
        return this.get('addPdf');
    }),
});
