import {setUserLanguage} from '../../utils/common-utils';
import Component from '@ember/component';
import { inject } from '@ember/service';

import $ from 'jquery';

export default Component.extend({
    tagName: '',
    i18n: inject(),
    translationsFetcher: inject(),
    actions : {
        changeLanguage (event) {
            $(event.target).closest("li").siblings().removeClass('active');
            $(event.target).closest("li").addClass('active');

            var value = event.target.parentElement.getAttribute("data-lang");
            /*
            if (value!="en" && value!="fr") {
                value = "en";//as default fall back for untranslated items
            }
            */
            setUserLanguage(value);
            this.get('translationsFetcher').fetch();
            $(".navbar-toggle").click();

        }
    }
});
