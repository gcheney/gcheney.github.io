/*! Plugin options and jQuery */

// dl-menu options
$(function() {
  $( '#dl-menu' ).dlmenu({
    animationClasses : { classin : 'dl-animate-in', classout : 'dl-animate-out' }
  });
});

// FitVids options
$(function() {
  $("article").fitVids();
});

$(".close-menu").click(function () {
  $(".menu").toggleClass("disabled");
  $(".links").toggleClass("enabled");
});

$(".about").click(function () {
  $("#about").css('display','block');
});

$(".close-about").click(function () {
  $("#about").css('display','');
});

// Add lightbox class to all image links
$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

// Magnific-Popup options
$(document).ready(function() {
  $('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 300, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });
});

// header
$(document).ready(function(e) {
  $(window).scroll(function(){
    var header = $('.header-menu');
    var scroll = $(window).scrollTop();
    if(scroll > 300){
      header.attr('class', 'header-menu header-menu-overflow');
    } else {
      header.attr('class', 'header-menu header-menu-top');
    }
  });
});

//mobile menu
$(document).ready(function(){
  $("#menu").attr('style', '');
  $("#menu").mmenu({
    "extensions": [
      "border-full",
      "effect-zoom-menu",
      "effect-zoom-panels",
      "pageshadow",
      "theme-dark"
    ],
    "counters": true,
    "navbars": [
      {
        "position": "bottom",
        "content": [
          "<a class='fa fa-search' href='/search'></a>",
          "<a class='fa fa-envelope' href='mailto:glendon@glendoncheney.com'></a>",
          "<a class='fa fa-github' href='https://github.com/gcheney'></a>",
          "<a class='fa fa-linkedin' href='https://www.linkedin.com/in/glendon-cheney-3a680926'></a>"
        ]
      }
    ]
  });
});


//floating social share
var sharing = function(){
    $(document).ready(function(){
      $("body").floatingSocialShare({
        buttons: ["facebook","twitter","google-plus", "linkedin", "pinterest"],
        text: "Share with "
      });
    });
};

//add tranition on hover
$(document).ready(function() {
    $('.hover').hover(function() {
        $(this).addClass('transition');  
    }, function() {
        $(this).removeClass('transition');
    });
});

//built-in scroll animation
$(document).ready(function() {
    $("a[href^=#]").click(function(e) { 
        e.preventDefault(); 
        var dest = $(this).attr('href'); 
        history.pushState(null, null, dest);
        $('html,body').animate({ scrollTop: $(dest).offset().top }, 'slow');
    });
});

// AJAX request to Formspree 
$(document).ready(function() {
  var $contactForm = $('#contact');
  $contactForm.submit(function(e) {
        e.preventDefault();
        var email = '//formspree.io/' + 'glendon.cheney' + '@' + 'gmail' + '.' + 'com';
        var url = 'https://formspree.io/' + email;
        $.ajax({
            url: url,
            method: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            beforeSend: function() {
                $contactForm.append('<div class="center" id="sending">Sending message…</div>');
                $('#sending').hide();
                $('#sending').slideUp('fast');
            },
            success: function(data) {
                $('#sending').hide();
                $contactForm.append('<div id="success" style="text-align: center; color: green;">Message sent successfully!</div>');
                $('#success').hide();
                $('#success').slideUp('fast');
          },
            error: function(err) {
                $('#sending').hide();
                $contactForm.append('<div id="error" style="text-align: center; color: red;">Oops, there was an issue sending your message. Please try again.</div>');
                $('#error').hide();
                $('#error').slideUp('fast');
                console.log(err);
            }
        });
  });
});



