(function ($) {
    $.fn.dopeNav = function (options) {

        // Variables
        var navContainer = $('.dope-nav-container');
        var dope_nav = $('.dopenav ul');
        var dope_navli = $('.dopenav > ul > li');
        var navbarToggler = $('.dope-navbar-toggler');
        var closeIcon = $('.dopecloseIcon');
        var navToggler = $('.navbarToggler');
        var dopeMenu = $('.dope-menu');
        var var_window = $(window);

        // default options
        var defaultOpt = $.extend({
            breakpoint: 991,
            openCloseSpeed: 350,
            megaopenCloseSpeed: 700,
            alwaysHidden: false,
            openMobileMenu: 'left',
            subMenuRtl: false,
            stickyNav: false,
            stickyFooterNav: false
        }, options);

        return this.each(function () {

            // open mobile menu direction 'left' or 'right' side
            if (defaultOpt.openMobileMenu === 'left' || defaultOpt.openMobileMenu === 'right') {
                navContainer.addClass(defaultOpt.openMobileMenu);
            }

            // dropdown rtl
            if (defaultOpt.subMenuRtl === true) {
                navContainer.addClass('dropdown-rtl');
            }

            // navbar toggler
            navbarToggler.on('click', function () {
                navToggler.toggleClass('active');
                dopeMenu.toggleClass('menu-on');
                $('.overlay').toggleClass("overlay-show");
            });

            $('.overlay').on('click', function () {
                navToggler.toggleClass('active');
                dopeMenu.toggleClass('menu-on');
                $('.overlay').removeClass("overlay-show");
            });

            // close icon
            closeIcon.on('click', function () {
                dopeMenu.removeClass('menu-on');
                navToggler.removeClass('active');
                $('.overlay').removeClass("overlay-show");
            });

            // add dropdown & megamenu class in parent li class
            dope_navli.has('.sub-menu').addClass('menu-item-has-children');
            dope_navli.has('.megamenu').addClass('megamenu-item');

            // adds toggle button to li items that have children
            dope_nav.find('li a').each(function () {
                if ($(this).next().length > 0) {
                    $(this).parent('li').addClass('menu-item-has-children').append('<span class="dd-trigger"></span>');
                }
            });

            // expands the dropdown menu on each click
            dope_nav.find('li .dd-trigger').on('click', function (e) {
                e.preventDefault();
                $(this).parent('li').children('ul').stop(true, true).slideToggle(defaultOpt.openCloseSpeed);
                $(this).parent('li').toggleClass('active');
            });

            // add padding in dropdown & megamenu item
            $('.megamenu-item').removeClass('menu-item-has-children');

            // expands the megamenu on each click
            dope_nav.find('li .dd-trigger').on('click', function (e) {
                e.preventDefault();
                $(this).parent('li').children('.megamenu').slideToggle(defaultOpt.megaopenCloseSpeed);
            });

            // check browser width in real-time
            function breakpointCheck() {
                var windoWidth = window.innerWidth;
                if (windoWidth <= defaultOpt.breakpoint) {
                    navContainer.removeClass('breakpoint-off').addClass('breakpoint-on');
                } else {
                    navContainer.removeClass('breakpoint-on').addClass('breakpoint-off');
                }
            }

            breakpointCheck();

            var_window.on('resize', function () {
                breakpointCheck();
            });

            // always hidden enable
            if (defaultOpt.alwaysHidden === true) {
                navContainer.addClass('breakpoint-on').removeClass('breakpoint-off');
            }

            // sticky
            if (defaultOpt.stickyNav === true) {
                var_window.on('scroll', function () {
                    if (var_window.scrollTop() > 0) {
                        navContainer.addClass('dope-sticky');
                    } else {
                        navContainer.removeClass('dope-sticky');
                    }
                });
            }

            // footer sticky
            if (defaultOpt.stickyFooterNav === true) {
                navContainer.addClass('dope-sticky-footer');
            }
        });
    };
}(jQuery));