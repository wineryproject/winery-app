export function initialize(appInstance) {
    let translationsFetcher = appInstance.lookup('service:translationsFetcher');
    translationsFetcher.fetch();
}

export default {
    name: 'i18n',
    initialize: initialize
}