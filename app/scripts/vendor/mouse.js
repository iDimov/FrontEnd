jQuery(function() {
  var mouseX = 0, mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;
  var docWidth = $(document).width();
  var docHeight = $(document).height();
  
    // Scroll monitors
    var curscrolling = false,
      lastScrollTop = 0,
      curstate = 'main',
      notusescroll = false;
    
    // Disable Scrolls
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};
    
    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
        e.preventDefault();
      e.returnValue = false;  
    }
    
    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }
  
    
    $('body').mouseover(function(){
      $(this).css({cursor: 'none'});
    });
    
    // Cursor
    var $box = $('.box'),
          $loader = $('.cursor .loading'),
      $drag = $('.drag'),
      inter = 30,
      speed = 0;
    
    function moveBox(e) {
          var timesel = 0.3;
            
          if($drag.hasClass('grab')) {
            timesel = 0.05;    
          }
  
      $box.each(function(index, val) {
              if(!$(this).hasClass('fixit')) {
                  if(index == 1) {
                      TweenLite.to($(this), timesel, { css: { left: e.pageX, top: e.pageY},delay:0+(index/750)});
                  } else {
                      TweenLite.to($(this), 0.05, { css: { left: e.pageX, top: e.pageY},delay:0+(index/750)});
                  }
              } else {
                  TweenLite.to($(this), timesel, { css: { opacity: 1, scale: 1 },delay:0+(index/750)});
              }
      });
    }
  
  
    function changeCursor(e) {
        TweenLite.to($box.eq(0), 0.05, { backgroundColor: "#ffffff", left: e.pageX, top: e.pageY});
          TweenLite.to($box.eq(1), 0.05, { borderColor: "#ffffff", left: e.pageX, top: e.pageY});
    }
    function restoreCursor(e) {
        TweenLite.to($box.eq(0), 0.05, { backgroundColor: "#fa343d", left: e.pageX, top: e.pageY});
          TweenLite.to($box.eq(1), 0.05, { borderColor: "#fa343d", left: e.pageX, top: e.pageY});
    }
    
  
      TweenLite.to($box.eq(1), 0, { scale: 1, opacity: 1, overwrite: "all"});
    
    $(document).on('mousemove', moveBox);
  
      
    $('.link').hover(
      function() {
        // TweenLite.to($box.eq(0), 0.1, {opacity: 0, repeat:0, delay: 0, overwrite:"all", ease: Circ.easeInOut});
        TweenLite.to($box.eq(1), 0.3, {scale: 0, opacity: 0, repeat:0, delay: 0, overwrite:"all", ease: Circ.easeInOut});
      }, function() {
        // TweenLite.to($box.eq(0), 0.1, {opacity: 1, repeat:0, delay: 0, overwrite:"all", ease: Circ.easeInOut});
        TweenLite.to($box.eq(1), 0.3, {scale: 1, opacity: 1, repeat:0, delay: 0, overwrite:"all", ease: Circ.easeInOut});
      }
    );
    
    $(document ).mouseleave(function() {
      $box.each(function(index, val) {
        TweenMax.set(
          $(this),{
            scale: 0,
            delay:0
          });
      });
    });
    $(document ).mouseenter(function() {
      $box.each(function(index, val) {
        TweenMax.set(
          $(this),{
            scale: 1,
            delay:0
          });
      });
    });
});
