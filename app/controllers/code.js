import BaseController from './base';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

import config from '../config/environment';
const { host, artifactNamespace } = config.DS;
const artifactBaseUrl = host+"/"+artifactNamespace;

export default BaseController.extend({

    queryParams: ['origin', 'entity', 'entityValue', 'language'],
    origin : null,
    entity : null,
    entityValue : null,
    language : null,

    pdfUrl: computed('origin', function() {
        let origin = this.get("origin");
        return artifactBaseUrl+`/${origin}.pdf`;
    }),

    pdfHtmlCode : computed('origin','entity', 'entityValue', function() {
        let url = this.get("pdfUrl");
        let entity = this.get("entity") || '';
        let entityValue = this.get("entityValue") || '';
        return htmlSafe(`<button type='button'><a href='${url}'>Download ${entity} ${entityValue} Pdf</a></button>`);
    }),

    pngUrl: computed('origin', function() {
        let origin = this.get("origin");
        return artifactBaseUrl+`/${origin}`;
    }),

    pngHtmlCode : computed('pngUrl', function() {
        let pngUrl = this.get("pngUrl");
        return htmlSafe(`<img src='${pngUrl}'/>`);
    }),

});
