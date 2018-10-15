jQuery.fn.rotate = function(degrees) {
  $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
               '-moz-transform' : 'rotate('+ degrees +'deg)',
               '-ms-transform' : 'rotate('+ degrees +'deg)',
               'transform' : 'rotate('+ degrees +'deg)'});
  return $(this);
};

jQuery.fn.wheel = function (callback) {
  return this.each(function () {
      $(this).on('mousewheel DOMMouseScroll', function (e) {
          e.delta = null;
          if (e.originalEvent) {
              if (e.originalEvent.wheelDelta) e.delta = e.originalEvent.wheelDelta / -40;
              if (e.originalEvent.deltaY) e.delta = e.originalEvent.deltaY;
              if (e.originalEvent.detail) e.delta = e.originalEvent.detail;
          }

          if (typeof callback == 'function') {
              callback.call(this, e);
          }
      });
  });
};

$(function() {
  // TODO: 字体加载完毕
  var ANIMATION_DELAY = 400;

  // disable scrolling
  $('body').on('scroll touchmove mousewheel', function(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  var router = ['index', 'destination', 'culture', 'experience', 'partners', 'activity', 'contact'];
  var routerIndex = 0;

  function route() {
    var hash = window.location.hash || '#index';
    hash = hash.replace('#', '');
    routerIndex = $.inArray(hash, router);
    
    var $nav = $('.nav-item[data-val="' + hash + '"]');
    var $navs = $('.nav-item');
    var $wrapper = $('#js-' + hash + '-wrapper');
    var $wrappers = $('.js-wrapper');
    var $body = $('body');
    if ($nav && $wrapper) {
      $body.removeClass().addClass(hash);
      $navs.removeClass('active');
      $nav.addClass('active');
      $wrappers.removeClass('active').hide();
      $wrapper.addClass('active').show();

      resetAnimation();

      switch(hash) {
        case 'index':
          route2Index();
          break;
        case 'destination':
          route2Destination();
          break;
        case 'culture':
          route2Culture();
          break;
        case 'experience':
          route2Experience();
          break;
        case 'partners':
          route2Partners();
          break;
        case 'activity':
          route2Activity();
          break;
        default:
          break;
      }
    }
  }

  if ('onhashchange' in window) {
    $(window).bind('hashchange', function(e) {
      route();
    });
  }

  $('body').wheel($.throttle(500, function (event) {
    if (event.delta > 0) {
      // up
      console.log('up');
      if (routerIndex > 0) {
        var hash = router[routerIndex - 1];
        window.location.hash = hash;
      }
    }
    else {
      // down
      console.log('down');
      if (routerIndex < router.length - 1) {
        var hash = router[routerIndex + 1];
        window.location.hash = hash;
      }
    }
  }));

  route();

  function resetAnimation() {
    $('.animated').removeClass('animated');

    resetCultureAnimation();
    resetPartnersAnimation();
    resetActivityAnimation();

    window.clearTimeout(panelTimer);
  }

  var panelTimer = null;
  function startPanelPointerAnimation() {
    var $wrapper = $('.js-wrapper.active');
    var $pointer = $wrapper.find('.js-panel-pointer');

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    function rotate() {
      var rnd = getRandomArbitrary(30, 160);
      $pointer.rotate(rnd);
      panelTimer =setTimeout(rotate, 500);
    }
    rotate();
  }
  
  function route2Index() {
    $('#js-index-wrapper').imagesLoaded( function() {
      // start animation after all images in index are loaded
      setTimeout(function() {
        startIndexAnimation();
      }, ANIMATION_DELAY);
    });
  
    function startIndexAnimation() {
      $('#js-index-panel').addClass('animated');
      setTimeout(function() {
        $('#js-index-border').addClass('animated');
      }, 50);
      setTimeout(function() {
        $('#js-logo').addClass('animated');
      }, 850); // 50 + 800(border's animation time)
      setTimeout(function() {
        $('#js-index-title').addClass('animated');
      }, 1650); // 850 + 800(border's animation time) + 800(logo's animation time)
      setTimeout(function() {
        $('#js-index-qrcode-container').addClass('animated');
      }, 1950); // 850 + 800(border's animation time) + 800(logo's animation time) + 300(title's animation time)
      setTimeout(function() {
        $('#js-index-signpost').addClass('animated');
      }, 2150); // 1650 + 800(border's animation time) + 800(logo's animation time) + 300(title's animation time) + 300(qrcode's animation time)
      setTimeout(function() {
        startPanelPointerAnimation();
      }, 2950); // 1950 + 800(signpost's animation time) + 800(logo's animation time) + 300(title's animation time) + 300(qrcode's animation time) +  + 800(signpost's animation time) + 
    }
  }

  // animation of subtitle lasts for 1500ms
  function startSubTitleAnimation() {
    const $wrapper = $('.js-wrapper.active');
    $wrapper.find('.js-subTitle').addClass('animated');
    $wrapper.find('.js-subTitle-line').addClass('animated');
    $wrapper.find('.js-desc-wrapper').addClass('animated');
  }

  function route2Destination() {
    $('#js-destination-wrapper').imagesLoaded( function() {
      // start animation after all images in destination page are loaded
      setTimeout(function() {
        startDestinationAnimation();
      }, ANIMATION_DELAY);
    });
  
    function startDestinationAnimation() {
      $('.js-destination-wiper').addClass('animated');
      $('#js-destination-cover').addClass('animated');
      setTimeout(function() {
        startSubTitleAnimation();
        startPanelPointerAnimation();
      }, 2000);
    }
  }

  function route2Culture() {
    $('#js-culture-wrapper').imagesLoaded( function() {
      // start animation after all images in culture page are loaded
      setTimeout(startSubTitleAnimation, ANIMATION_DELAY);
      setTimeout(startCultureAnimation, ANIMATION_DELAY + 1500); // 1500 is the time of animation of subtitle
    });

    function clickNextCultureVideo() {
      $('#js-culture-video-next').click(function() {
        resetCultureAnimation(true);
        setTimeout(startCultureAnimation, 200);
      });
    }
  
    function startCultureAnimation() {
      startPanelPointerAnimation();
      $('#js-cultures-car-wrapper').show();
      $('#js-culture-magicDrip').addClass('animated');
      setTimeout(function() {
        $('#js-cultures-car-wrapper').addClass('animated');
      }, 400) // 400(drip's animation time)
      setTimeout(function() {
        $('#js-culture-car-turbo').addClass('animated');
        $('#js-culture-car-turbo').show();
      }, 1000) // 400 + 600(cars' animation time)
      setTimeout(function() {
        $('#js-culture-car-turbo').hide();
        $('#js-cultures-car-wrapper').addClass('departed');
      }, 1400) // 400 + 600 + 400(turbo's animation time)
      // setTimeout(function() {
      //   $('#js-culture-enjoychongqing').addClass('animated');
      // }, 1900) // 400 + 600 + 400 + 500(car's animation time)
      setTimeout(function() {
        $('#js-culture-next-car').addClass('animated');
      }, 2300) // 400 + 600 + 400 + 500 + 400(enjoychongqing's animation time)
      setTimeout(function() {
        $('#js-culture-magicDrip-next').addClass('animated');
        $('#js-culture-video-next').addClass('animated');
        clickNextCultureVideo();
      }, 3100) // 400 + 600 + 400 + 500 + 400 + 800(next-car's animation time)
    }
  }

  function resetCultureAnimation(hide) {
    if (hide) {
      $('#js-cultures-car-wrapper').hide();
    }
    $('#js-cultures-car-wrapper').removeClass('departed').removeClass('animated');
    $('#js-culture-magicDrip-next').removeClass('animated');
    $('#js-culture-next-car').removeClass('animated');
    // $('#js-culture-enjoychongqing').removeClass('animated');
    $('#js-culture-car-turbo').removeClass('animated');
    $('#js-culture-magicDrip').removeClass('animated');
  }

  function route2Experience() {
    $('#js-experience-wrapper').imagesLoaded( function() {
      // start animation after all images in culture page are loaded
      setTimeout(startSubTitleAnimation, ANIMATION_DELAY);
      setTimeout(startExperienceAnimation, ANIMATION_DELAY + 1500); // 1500 is the time of animation of subtitle
    });
  
    function startExperienceAnimation() {
      startPanelPointerAnimation();
      $('#js-experience-ipad').addClass('animated');
      $('#js-experience-ipad-shadow').addClass('animated');
      setTimeout(function() {
        $('#js-experience-road').addClass('animated');
      }, 600) // 600(ipad's animation time)
      setTimeout(function() {
        $('#js-experience-car').addClass('animated');
      }, 1200) // 600 + 600(road's animation time)
      setTimeout(function() {
        $('#js-experience-landscape-wrapper').addClass('animated');
      }, 1800) // 600 + 600 + 600(car's animation time)
      setTimeout(function() {
        $('#js-experience-landscape').addClass('animated');
      }, 2400) // 600 + 600 + 600 + 600(landscape's animation time)
    }
  }

  function route2Partners() {
    $('#js-partners-wrapper').imagesLoaded(function() {
      // start animation after all images in culture page are loaded
      setTimeout(startSubTitleAnimation, ANIMATION_DELAY);
      setTimeout(startPartnersAnimation, ANIMATION_DELAY + 1500); // 1500 is the time of animation of subtitle
    });
    
    function startPartnersAnimation() {
      
      var getOnboard = function(toAnimate, ix){
        if(toAnimate[ix]){
          var $toAnimate = $(toAnimate[ix]);
          $toAnimate.attr('data-original-left', $toAnimate.css('left'));
          $($toAnimate).animate({left: '24%'}, 300, function () {
            $($toAnimate).hide(100, function(){ getOnboard(toAnimate, ix + 1 )});
          });
        }
      };

      var showBrands = function(toAnimate, ix){
        if(toAnimate[ix]){
          $(toAnimate[ix]).fadeIn(210, function(){ showBrands(toAnimate, ix + 1 )});
        }
      };

      startPanelPointerAnimation();
      $('#js-partners-car').addClass('animated');
      setTimeout(function() {
        getOnboard($('.js-partners-person'), 0);
        showBrands($('.js-partners-brand'), 0);
      }, 800) // 800(car's animation time)
    }
  }

  function resetPartnersAnimation () {
    $('.js-partners-person').clearQueue().finish();
    $('.js-partners-brand').clearQueue().finish();

    $('.js-partners-brand').hide();
    $('.js-partners-person').each(function(index, person) {
      person = $(person);
      person.css('left', person.attr('data-original-left')).show();
    })
  }

  function route2Activity() {
    var $bus = $('#js-activity-car');
    var $recorder = $('#js-activity-recorder');
    var offset = 0;
    $('#js-activity-wrapper').imagesLoaded(function() {
      // adjust bus's position
      offset = $bus.height() - $recorder.height() * 0.33;
      $recorder.css({
        left: $bus.width() * .310843373,
        bottom: 0 - $recorder.height() * 0.25,
        width: ($recorder.height() * 169) / 567,
      }).hide();

      $('.js-activity-coverage-column').hide().css({'margin-left': '-5%'});

      setTimeout(startSubTitleAnimation, ANIMATION_DELAY);
      setTimeout(startActivityAnimation, ANIMATION_DELAY + 1500); // 1500 is the time of animation of subtitle
    });
    
    function startActivityAnimation() {
      var showImageColumns = function(toAnimate, ix){
        if(toAnimate[ix]){
          $(toAnimate[ix]).animate({'margin-left':0, opacity:"show"}, function(){ showImageColumns(toAnimate, ix + 1 )});
        }
      };

      startPanelPointerAnimation();
      $bus.addClass('animated');
      setTimeout(function() {
        $recorder.fadeTo(150, 1, function() {
          $recorder.animate({bottom: offset}, function() {
            $recorder.animate({width: '82.3633157%'});
          });
        });
      }, 800) // 800 (car's animation time)
      setTimeout(function() {
        showImageColumns($('.js-activity-coverage-column'), 0)
      }, 1500);
    }
  }

  function resetActivityAnimation() {
    $('.js-activity-coverage-column').clearQueue().finish();
  }
});
