AOS.init({
    duration: 800,
    easing: 'slide',
});

(function ($) {
    'use strict';

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            );
        },
    };

    // Виклик stellar.js тільки якщо плагін підключений
    if ($.fn.stellar) {
        $(window).stellar({
            responsive: true,
            parallaxBackgrounds: true,
            parallaxElements: true,
            horizontalScrolling: false,
            hideDistantElements: false,
            scrollProperty: 'scroll',
        });
    } else {
        console.warn('Stellar.js plugin is not loaded.');
    }

    var fullHeight = function () {
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    fullHeight();

    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#ftco-loader').length > 0) {
                $('#ftco-loader').removeClass('show');
            }
        }, 1);
    };
    loader();

    // Scrollax
    if ($.Scrollax) {
        $.Scrollax();
    }

    var carousel = function () {
        $('.carousel-testimony').owlCarousel({
            center: true,
            loop: true,
            items: 1,
            margin: 30,
            stagePadding: 0,
            nav: true,
            navText: [
                '<span class="ion-ios-arrow-back"></span>',
                '<span class="ion-ios-arrow-forward"></span>',
            ],
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 2,
                },
                1000: {
                    items: 2,
                },
            },
        });

        $('.single-slider').owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            autoplay: true,
            loop: true,
            items: 1,
            margin: 0,
            stagePadding: 0,
            nav: true,
            dots: true,
            navText: [
                '<span class="ion-ios-arrow-back"></span>',
                '<span class="ion-ios-arrow-forward"></span>',
            ],
            responsive: {
                0: {
                    items: 1,
                },
                600: {
                    items: 1,
                },
                1000: {
                    items: 1,
                },
            },
        });
    };
    carousel();

    // Dropdown hover effect
    $('nav .dropdown').hover(
        function () {
            var $this = $(this);
            $this.addClass('show');
            $this.find('> a').attr('aria-expanded', true);
            $this.find('.dropdown-menu').addClass('show');
        },
        function () {
            var $this = $(this);
            $this.removeClass('show');
            $this.find('> a').attr('aria-expanded', false);
            $this.find('.dropdown-menu').removeClass('show');
        },
    );

    $('#dropdown04').on('show.bs.dropdown', function () {
        console.log('show');
    });

    // Scroll events for navbar
    var scrollWindow = function () {
        $(window).scroll(function () {
            var $w = $(this),
                st = $w.scrollTop(),
                navbar = $('.ftco_navbar'),
                sd = $('.js-scroll-wrap');

            if (st > -1) {
                if (!navbar.hasClass('scrolled')) {
                    navbar.addClass('scrolled');
                }
            }
            if (st < -1) {
                if (navbar.hasClass('scrolled')) {
                    navbar.removeClass('scrolled sleep');
                }
            }
            if (st > -1) {
                if (!navbar.hasClass('awake')) {
                    navbar.addClass('awake');
                }
                if (sd.length > 0) {
                    sd.addClass('sleep');
                }
            }
            if (st < -1) {
                if (navbar.hasClass('awake')) {
                    navbar.removeClass('awake');
                    navbar.addClass('sleep');
                }
                if (sd.length > 0) {
                    sd.removeClass('sleep');
                }
            }
        });
    };
    scrollWindow();

    var counter = function () {
        $('#section-counter').waypoint(
            function (direction) {
                if (
                    direction === 'down' &&
                    !$(this.element).hasClass('ftco-animated')
                ) {
                    var comma_separator_number_step =
                        $.animateNumber.numberStepFactories.separator(',');
                    $('.number').each(function () {
                        var $this = $(this),
                            num = $this.data('number');
                        $this.animateNumber(
                            {
                                number: num,
                                numberStep: comma_separator_number_step,
                            },
                            7000,
                        );
                    });
                }
            },
            { offset: '95%' },
        );
    };
    counter();

    var contentWayPoint = function () {
        var i = 0;
        $('.ftco-animate').waypoint(
            function (direction) {
                if (
                    direction === 'down' &&
                    !$(this.element).hasClass('ftco-animated')
                ) {
                    i++;
                    $(this.element).addClass('item-animate');
                    setTimeout(function () {
                        $('body .ftco-animate.item-animate').each(function (k) {
                            var el = $(this);
                            setTimeout(
                                function () {
                                    var effect = el.data('animate-effect');
                                    if (effect === 'fadeIn') {
                                        el.addClass('fadeIn ftco-animated');
                                    } else if (effect === 'fadeInLeft') {
                                        el.addClass('fadeInLeft ftco-animated');
                                    } else if (effect === 'fadeInRight') {
                                        el.addClass('fadeInRight ftco-animated');
                                    } else {
                                        el.addClass('fadeInUp ftco-animated');
                                    }
                                    el.removeClass('item-animate');
                                },
                                k * 50,
                                'easeInOutExpo',
                            );
                        });
                    }, 100);
                }
            },
            { offset: '95%' },
        );
    };
    contentWayPoint();

    // One Page Nav smooth scroll
    var OnePageNav = function () {
        $(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on(
            'click',
            function (e) {
                e.preventDefault();

                var hash = this.hash,
                    navToggler = $('.navbar-toggler');

                $('html, body').animate(
                    {
                        scrollTop: $(hash).offset().top,
                    },
                    700,
                    'easeInOutExpo',
                    function () {
                        window.location.hash = hash;
                    },
                );

                if (navToggler.is(':visible')) {
                    navToggler.click();
                }
            },
        );

        $('body').on('activate.bs.scrollspy', function () {
            console.log('nice');
        });
    };
    OnePageNav();

    // Magnific Popup for images
    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1],
        },
        image: {
            verticalFit: true,
        },
        zoom: {
            enabled: true,
            duration: 300,
        },
    });

    // Magnific Popup for videos and maps
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });

    // Datepicker initialization
    $('.checkin_date, .checkout_date').datepicker({
        format: 'm/d/yyyy',
        autoclose: true,
    });

})(jQuery);
