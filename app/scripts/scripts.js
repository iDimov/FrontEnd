// "use strict";
jQuery(function ($){ 
  
  var homeIn = function() {
    var $bg = $('.intro-bg');
    var $white_line = $('.white-line');
    var $into_h1 = $('.intro__h1-title');
    var $into_info = $('.intro__intro-info');
    var $navigationMenu = $('.menu-link');
    var $line = $('.cb-btn_view-line');
    var $button_text = $('.cb-btn_view-text span');
  
    var tlHome = new TimelineMax();
    
    tlHome
      .to($bg, 2, {
        alpha: 1 
      })
      .to($white_line, 1.3, {
        height: '100vh',
        ease: Power4.easeOut
      }, '-=1.5')
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
      .to($line, .7, {
        width: '100%',
        ease: Power4.easeInOut,
      }, '-=.5')
      .to($button_text, 1.2, {
        y: -35,
        ease: Power4.easeInOut,
      }, '-=.8')
      .to($bg, 4, {
        scale: 1.05,
        ease: Power1.easeInOut
      }, '-=2.5');
  }


  var aboutIn = function () {
    console.log('about');
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


  aboutIn();
  homeIn();


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
          $oldContainer.hide();
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
      aboutIn();
      $('.menu-link').removeClass('active');
      $('.menu-link:contains("About")').addClass('active');
      $("nav ul").addClass('navigation__menu-w');
    } else if (namespace === 'history') {
      aboutIn();
    }
  });


  Barba.Pjax.getTransition = function () {
    return FadeTransition;
  };

  $(document).trigger('pageLoaded', [$('.barba-container')]);

  Barba.Pjax.start();

  $(function () {

    $(".cb-btn_view.-magnet").each(function () {
      var t = $(this),
        o = t.find(".cb-btn_view-text"),
        a = t.find(".cb-btn_view-line"),
        n = void 0,
        r = void 0,
        s = void 0,
        i = void 0,
        l = function (e, t, n, r, s, i) {
          TweenLite.to(o, s, {
            top: t,
            left: e,
            overwrite: !0
          }), TweenLite.to(a, i, {
            top: r,
            left: n,
            overwrite: !0
          })
        };
      t.on("mouseenter", function (t) {
        n = o.offset().top - $(window).scrollTop(), r = o.offset().left - $(window).scrollLeft(), s = o.outerWidth(), i = o.outerHeight()
      }), t.on("mousemove", function (t) {
        var a = t.clientY,
          c = t.clientX;
        n = o.offset().top - $(window).scrollTop(), r = o.offset().left - $(window).scrollLeft(), s = o.outerWidth(), i = o.outerHeight();
        var f = a - n - i / 2,
          d = c - r - s / 2,
          u = f - 3,
          h = d;
        l(d, f, h, u, .4, .7)
      }), t.on("mouseleave", function (e) {
        l(0, 0, 0, 0, .7, .5)
      })
    })



  });

});
