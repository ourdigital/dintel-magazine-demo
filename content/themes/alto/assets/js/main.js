var html = $('html');

$(function () {
    darkMode();
    carousel();
    mobileMenu();
    scrollEffects();
    scrollToTop();
});

function darkMode() {
    // Support both the original theme switcher and our custom one
    $('.toggle-track, .gh-head-theme-switch').on('click', function () {
        if (html.hasClass('dark-mode')) {
            html.removeClass('dark-mode');
            localStorage.setItem('alto_dark', false);
        } else {
            html.addClass('dark-mode');
            localStorage.setItem('alto_dark', true);
        }
    });
    
    // Check for saved dark mode preference on page load
    if (localStorage.getItem('alto_dark') === 'true') {
        html.addClass('dark-mode');
    } else if (localStorage.getItem('alto_dark') === 'false') {
        html.removeClass('dark-mode');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If no preference was saved and system is set to dark mode, enable dark mode
        html.addClass('dark-mode');
        localStorage.setItem('alto_dark', true);
    }
}

function carousel() {
    var carousel = $('.carousel');
    var postImage = carousel.find('.post-image');
    var imageHeight, nav;

    function moveNav() {
        imageHeight = postImage.height();
        if (!nav) {
            nav = carousel.find('.owl-prev, .owl-next');
        }
        nav.css({
            top: imageHeight / 2 + 'px',
            opacity: 1,
        });
    }

    carousel.owlCarousel({
        dots: true,
        margin: 28,
        nav: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navText: [
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M20.547 22.107l-6.107-6.107 6.107-6.12-1.88-1.88-8 8 8 8 1.88-1.893z"></path></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M11.453 22.107l6.107-6.107-6.107-6.12 1.88-1.88 8 8-8 8-1.88-1.893z"></path></svg>',
        ],
        onInitialized: function () {
            moveNav();
            carousel.css('visibility', 'visible');
        },
        onResized: function () {
            moveNav();
        },
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    });
}

function mobileMenu() {
    // Mobile menu toggle
    $('.gh-burger').on('click', function () {
        $('body').toggleClass('gh-head-open');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function (e) {
        if ($('body').hasClass('gh-head-open') && !$(e.target).closest('.gh-head-inner').length && !$(e.target).closest('.gh-burger').length) {
            $('body').removeClass('gh-head-open');
        }
    });
}

function scrollEffects() {
    // Add animation classes to posts on scroll
    function animatePosts() {
        $('.post').each(function () {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() * 0.85 && !$(this).hasClass('animated')) {
                $(this).addClass('animated');
            }
        });
    }
    
    // Run once when page loads
    animatePosts();
    
    // Run on scroll
    $(window).on('scroll', animatePosts);
}

function scrollToTop() {
    // Add scroll to top button if it doesn't exist yet
    if ($('.scroll-to-top').length === 0) {
        $('.gh-foot-bottom').append('<a href="#" class="scroll-to-top"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2L18.7 8.7 17.3 10.1 13 5.8 13 22 11 22 11 5.8 6.7 10.1 5.3 8.7z"/></svg></a>');
    }
    
    // Scroll to top on click
    $('.scroll-to-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // Show/hide scroll to top button
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 300) {
            $('.scroll-to-top').addClass('visible');
        } else {
            $('.scroll-to-top').removeClass('visible');
        }
    });
}
