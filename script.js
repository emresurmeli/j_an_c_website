$(document).ready(function() {

  if ($("#js-parallax-window-two").length) {
    parallax();
  }

  $(window).scroll(function(e) {
    if ($(".parallax-window").length) {
      parallax();
    }
  });

  function parallax(){
    if( $(".parallax-window").length > 0 ) {
      var plxBackground = $(".parallax-background");
      var plxWindow = $(".parallax-window");

      var plxWindowTopToPageTop = $(plxWindow).offset().top;
      var windowTopToPageTop = $(window).scrollTop();
      var plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

      var plxBackgroundTopToPageTop = $(plxBackground).offset().top;
      var windowInnerHeight = window.innerHeight;
      var plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
      var plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
      var plxSpeed = 0.35;

      plxBackground.css('top', - (plxWindowTopToWindowTop * plxSpeed) + 'px');
    }
  }

  var menuToggle = $('#js-centered-navigation-mobile-menu').unbind();
  $('#js-centered-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-centered-navigation-menu').slideToggle(function(){
      if($('#js-centered-navigation-menu').is(':hidden')) {
        $('#js-centered-navigation-menu').removeAttr('style');
      }
    });
  });

  var bittersMap = (function () {
    var butterMilkCord = new google.maps.LatLng(41.663407, -73.964074),
        holidayInnCord = new google.maps.LatLng(41.677393, -73.927240),
        mapCenter = new google.maps.LatLng(41.663407, -73.964074),
        mapCanvas = document.getElementById('map_canvas'),
        mapOptions = {
          center: mapCenter,
          zoom: 12,
          scrollwheel: true,
          draggable: true,
          disableDefaultUI: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        map = new google.maps.Map(mapCanvas, mapOptions),
        holidayInnContent =
          '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">Holiday Inn Express, Poughkeepsie</h1>'+
          '<div id="bodyContent"'+
          '<p>220 2750 South Rd</br> Poughkeepsie, NY 12601</p>'+
          '</div>'+
          '</div>',
        holidayInnInfo = new google.maps.InfoWindow({
          content: holidayInnContent,
          maxWidth: 300
        }),
        butterMilkContent =
          '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">Buttermilk Farms</h1>'+
          '<div id="bodyContent"'+
          '<p>220 North Road, Milton</br> New York, NY 12547</p>'+
          '</div>'+
          '</div>',
        butterMilkInfo = new google.maps.InfoWindow({
          content: butterMilkContent,
          maxWidth: 300
        }),
        butterMilk = new google.maps.Marker({
          position: butterMilkCord,
          map: map,
          title: 'Buttermilk Farms'
        });
        holidayInn = new google.maps.Marker({
          position: holidayInnCord,
          map: map,
          title: 'Holiday Inn Express, Poughkeepsie'
        });

    return {
      init: function () {
        map.set('styles', [{
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            { hue: '#ffff00' },
            { saturation: 30 },
            { lightness: 10}
          ]}
        ]);

        google.maps.event.addListener(butterMilk, 'click', function () {
          holidayInnInfo.close(map, holidayInn);
          butterMilkInfo.open(map, butterMilk);
        });
        google.maps.event.addListener(holidayInn, 'click', function () {
          butterMilkInfo.close(map, butterMilk);
          holidayInnInfo.open(map, holidayInn);
        });
      }
    };
  }());

  bittersMap.init();
});
