import Controller from '@ember/controller';

export default Controller.extend({

    actions : {
       selectLanguage (language) {
         this.set("selectedLanguage", language);
         this.set("model.languageCode", language.code);
       },
    }
});
