import Ember from 'ember';

export default Ember.Component.extend({
    tagName : '',
    didInsertElement() {
        $('#toTop').click(
            function(){
                $('body,html').animate(
                    {scrollTop:0}
                );
            }
        );
        $(window).scroll(
            function(){
                if( $(this).scrollTop()>480)
                    $('#toTop').addClass('show');
                else 
                    $('#toTop').removeClass('show');
            }
        );
    }
});
