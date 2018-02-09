// "use strict";
jQuery(function ($){ 
  
  var homeIn = function() {
    var $bg = $('.intro-bg');
    var $white_line = $('.white-line');
    var $into_h1 = $('.intro__h1-title');
    var $into_info = $('.intro__intro-info');
    var $navigationMenu = $('.menu-link');
  
    var tlHome = new TimelineMax();
    
    tlHome
      .to($bg, 1, {
        alpha: 1 
      })
      .to($white_line, 1.3, {
        height: '100vh',
        ease: Power4.easeOut,
        delay: .1
      })
      .to($into_h1, 1.3, {
        y: -161,
        ease: Power4.easeInOut,
      }, '-=.3')
      .to($into_info, 1.5, {
        x: -50,
        autoAlpha: 1,
        ease: Power4.easeInOut,
      }, '-=1.5')
      .staggerTo($navigationMenu, .7, {
        y: 50,
        autoAlpha: 1,
        ease: Circ.easeInOut
      }, 0.1, '-=3')
      .to($bg, 5, {
        scale: 1.1,
        ease: Power4.easeInOut
      }, '-=2');
  }


  var aboutIn = function () {
    var about_columns = $('.wrap__content-right > div');
    var about_gallery = $('.wrap__gallery');
    var timeline = $('.timeline');
    var $navigationMenu = $('.navigation');
    var tl2 = new TimelineMax();

    tl2
      .fromTo(about_gallery, 1, {
        autoAlpha: 0,
        width: 0,
        x: '50%'
      }, {
        autoAlpha: 1,
        width: '48%',
        x: '0%'
      })
      .staggerFromTo(about_columns, 1, {
        autoAlpha: 0,
        y: 40
      }, {
        autoAlpha: 1,
        y: 0
      }, 0.4)
      .to(timeline, 1, {
        autoAlpha: 1,
        y: -60
      }, '-=1');
  };


  homeIn();
  aboutIn();


  var FadeTransition = Barba.BaseTransition.extend({

    start: function () {
      this.newContainerLoading.then(this.display.bind(this));
    },

    display: function () {
      var _this = this;
      var $newContainer = $(this.newContainer);
      var $oldContainer = $(this.oldContainer);
      var $white_line = $('.white-line');
      var $into_h1 = $('.intro__h1-title');
      var $into_info = $('.intro__intro-info');
      var about_columns = $('.wrap__content-right > div');
      var about_gallery = $('.wrap__gallery');
      var timeline = $('.timeline');
      // var $navigationMenu = $('.navigation');
      var namespaceOld = $oldContainer.data('namespace');

      $(document).trigger('pageLoading', [$newContainer]);

      var tl = new TimelineMax({
        onComplete: function () {
          $oldContainer.hide('slow');
          _this.done();
          $(document).trigger('pageLoaded', [$newContainer]);
        }
      });
      if (namespaceOld === 'homepage') {

        tl.to($white_line, 1, {
          height: '0vh',
        })
          .to($into_h1, 1, {
            y: 161,

          }, '-=.9')
          // .to($navigationMenu, 1.1, {
          //   x: 60,
          //   autoAlpha: 0,
          //   ease: Power3.easeInOut
          // }, '-=.5')
          .to($into_info, 1, {
            x: 40,
            autoAlpha: 0
          }, '-=.9')
          .to($oldContainer, .5, { autoAlpha: 0 })
          .fromTo($newContainer, .5, { autoAlpha: 0 }, { autoAlpha: 1 });
      } else if (namespaceOld === 'aboutpage') {
        tl
          .to(about_gallery, .5, {
            autoAlpha: 0,
            width: 0,
            x: '0%',
            ease: Power4.easeOut
          })
          .staggerTo(about_columns, 1, {
            autoAlpha: 0,
            y: 50,
            ease: Power4.easeOut
          }, '.2', '-=.3')
          // .to($navigationMenu, 1.1, {
          //   x: 60,
          //   autoAlpha: 0,
          //   ease: Power3.easeInOut
          // }, '-=1.5')
          .to(timeline, 1, {
            autoAlpha: 0,
            y: 40,
            ease: Power4.easeOut

          }, '-=1')
          .to($oldContainer, .5, { autoAlpha: 0 })
          .fromTo($newContainer, .5, { autoAlpha: 0 }, { autoAlpha: 1 });
      } else if (namespaceOld === 'history') {
        tl
          .to(about_gallery, .5, {
            autoAlpha: 0,
            width: 0,
            x: '0%',
            ease: Power4.easeOut
          })
          .staggerTo(about_columns, 1, {
            autoAlpha: 0,
            y: 50,
            ease: Power4.easeOut
          }, '.2', '-=.3')
          .to($navigationMenu, 1.1, {
            x: 60,
            autoAlpha: 0,
            ease: Power3.easeInOut
          }, '-=1.5')
          .to(timeline, 1, {
            autoAlpha: 0,
            y: 40,
            ease: Power4.easeOut

          }, '-=1')
          .to($oldContainer, .5, { autoAlpha: 0 })
          .fromTo($newContainer, .5, { autoAlpha: 0 }, { autoAlpha: 1 });
      }
    }
  });

  $(document).on('pageLoaded', function (e, $page) {
    console.log('here', $page);
    var namespace = $page.data('namespace');
    var url = location.pathname;

    if (namespace === 'homepage') {
      $("nav ul").removeClass('navigation__menu-w');
      homeIn();
    } else if (namespace === 'aboutpage') {
      $('.menu-link').removeClass('active');
      $('.menu-link:contains("About")').addClass('active');
      $("nav ul").addClass('navigation__menu-w');
      aboutIn();
    } else if (namespace === 'history') {
      aboutIn();
    }
  });


  Barba.Pjax.getTransition = function () {
    return FadeTransition;
  };

  $(document).trigger('pageLoaded', [$('.barba-container')]);

  Barba.Pjax.start();

});
