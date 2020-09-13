import Component from '@ember/component'; 
import { computed } from '@ember/object'; 
import { htmlSafe } from '@ember/string';

export default Component.extend({
    tagName : '',
    
    icon : '',
    iconFamily : '',
    color : '',
    backgroundColor : '',
    myStyle: computed('color','backgroundColor', function() {
        var colorStyle = this.get('color')?"color : #"+this.get('color'):'';
        var colorBackgroundStyle = this.get('backgroundColor')?"background-color : #"+this.get('backgroundColor'):'';
        return htmlSafe(colorStyle+';'+colorBackgroundStyle);
    }),
    myIcon: computed('icon','iconFamily', function() {
       return htmlSafe(this.get('icon')+' '+this.get('iconFamily'));
    }),
});
