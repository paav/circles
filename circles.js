(function($) {
  $(function() {
    $.fn.rotate = function(deg) {
      $(this).css({
        '-webkit-transform': 'rotate('+ deg +'deg)',
        '-moz-transform': 'rotate('+ deg +'deg)',
        '-ms-transform': 'rotate('+ deg +'deg)',
        'transform': 'rotate('+ deg +'deg)'
      });

      return $(this);
    }
    
    $.fn.animateRotate = function(startDeg, angle, duration, easing, complete) {
      return this.each(function() {
        var $elem = $(this);

        $({deg: startDeg}).animate({deg: angle}, {
          duration: duration,
          easing: easing,
          step: function(now) {
            $elem.css({
              '-webkit-transform': 'rotate(' + now + 'deg)',
              '-moz-transform': 'rotate('+ now +'deg)',
              '-ms-transform': 'rotate('+ now +'deg)',
              'transform': 'rotate('+ now +'deg)'
            });
          },
          complete: complete || $.noop
        });
      });
    };

    var deg = 0;
    var degs = [0, 45, 90];

    $('.child-circle').each(function(i) {
      $(this).animateRotate(0, degs[i], 3000);
      $(this).animate({
        'left': '-60%',
      }, 1000);
    });

    $('#container').animate({
      'left': '105%',
    }, 2500, 'swing', function() {
      $('.top').addClass('inactive');
      $('.main-circle').on('mouseover', rotate);
    });  

    var timeoutIdCount;

    function rotate(e) {
      var circleHalfJq = $(e.target);

      (function runWithDelay() {
        console.log(deg);

        if (deg == 0 && circleHalfJq.hasClass('top')) {
          circleHalfJq.addClass('inactive');
          return;
        } else if (deg == -90 && circleHalfJq.hasClass('bottom')) {
          circleHalfJq.addClass('inactive');
          return;
        }
        
        $('.top, .bottom').removeClass('inactive');

        var prevDeg = deg;

        $(e.target).hasClass('bottom') ? deg -= 45 : deg += 45;

        $('.child-circle').each(function(i) {
          $(this).animateRotate(degs[i] + prevDeg, degs[i] + deg, 800);
        });

        timeoutIdCount = setTimeout(runWithDelay, 1300);
      })();
    }

    $('.main-circle').on('mouseout', function(e) {
      console.log(timeoutIdCount);
      clearTimeout(timeoutIdCount);
    });
  });
})(jQuery);
