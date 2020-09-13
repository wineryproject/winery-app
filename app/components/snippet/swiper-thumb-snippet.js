import Ember from 'ember';
import base from '../../mixins/component-base-mixin';
import {prepareImagesInfo} from '../../utils/business-utils';

export default Ember.Component.extend(base, {
    tagName:'',
    entity : null,
    entityWebPath : null,

    _swiper : false,

    data : null,
    pagination: false,

    infoService : Ember.inject.service("info"),

    didUpdateAttrs() {
        this._super(...arguments);
    
        /*
         Data-down Swiper slide activation
         */
        if (this.get('currentSlide') !== this.get('_currentSlideInternal')) {
          let index = this.get('currentSlide');
    
          if (this.get('loop')) {
            let swiper = this.get('_swiper');
    
            index = swiper.slides
              .parent()
              .find(`[data-swiper-slide-index="${this.get('currentSlide')}"]`)
              .prevAll().length;
          }
    
          this.get('_swiper').slideTo(index);
          this.set('_currentSlideInternal', this.get('currentSlide'));
        }
    
        /*
         Trigger `update()` of swiper
         */
        if (this.get('updateFor') !== this.get('_updateForInternal')) {
          once(this.get('_swiper'), 'update');
          this.set('_updateForInternal', this.get('updateFor'));
        }
    },
    _slideChanged(swiper) {
        let index;
    
        if (this.get('loop')) {
          index = parseInt(
            swiper.slides
              .parent()
              .find('.swiper-slide-active')
              .attr('data-swiper-slide-index'),
            10
          );
        } else {
          index = swiper.realIndex;
        }
    
        this.set('_currentSlideInternal', index);
        this.set('currentSlide', index);
        this.get('onChange')(swiper.slides[swiper.realIndex]);
      },
    didInsertElement() {
        this._super(...arguments);
        /*
        this.set('registerAs', this);
    
        let swiperOptions = assign(
          { initialSlide: this.get('currentSlide') },
          this._getOptions()
        );
    */
        
        let myswiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            effect: 'fade',
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          });

              var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                slidesPerView: 4,
                loop: true,
                freeMode: true,
                loopedSlides: 5, //looped slides should be the same
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                });
            var galleryTop = new Swiper('.gallery-top', {
                spaceBetween: 10,
                loop:true,
                loopedSlides: 5, //looped slides should be the same
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                thumbs: {
                    swiper: galleryThumbs,
                },
                });
          //let instance = //this.set('_swiper', new Swiper(this.element, swiperOptions));
          let instance = this.set('_swiper', galleryThumbs);
          
        instance.on(
          'slideChangeTransitionEnd',
          this._slideChanged.bind(this, instance)
        );
    /*
        // Subscribe configured actions as Swiper events
        keys(this.get('events')).forEach((evt) =>
          instance.on(evt, this.get(`events.${evt}`))
        );
    
        // Manual initalization when user requires `init` event handling
        if (swiperOptions.init === false) {
          instance.init();
        }
        */
      },
    
      willDestroyElement() {
        this._super(...arguments);
        let instance = this.get('_swiper');
    
        if (instance) {
          instance.off('slideChangeTransitionEnd');
          instance.destroy();
          instance = this.set('_swiper', null);
        }
      },
});
