export function notifySuccess(that, i18n) {
    that.get('notifications').success(that.get('i18n').t(i18n), {
        autoClear: true
    });
}

export function notifyFailure(that, i18n) {
    that.get('notifications').error(that.get('i18n').t(i18n), {
        autoClear: true
    });
}

export default { 
    notifySuccess: notifySuccess 
};