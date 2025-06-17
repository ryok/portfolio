// Portfolio Interactive Enhancements

$(document).ready(function() {
    // Add particle burst effect on portfolio item hover
    $('.box').on('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2 + window.pageYOffset;
        
        // Trigger particle burst in cosmic network
        if (window.mousePressed) {
            window.mousePressed(x, y);
        }
    });
    
    // Smooth scroll with particle trail
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800, 'swing');
        }
    });
    
    // Add glowing effect to navigation on scroll
    let lastScroll = 0;
    $(window).on('scroll', function() {
        const currentScroll = $(this).scrollTop();
        const nav = $('#nav');
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.addClass('scrolled');
        } else {
            nav.removeClass('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Parallax effect for banner
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        const parallax = scrolled * 0.5;
        $('#banner').css('transform', 'translateY(' + parallax + 'px)');
    });
    
    // Add hover effect to social links
    $('.social li a').hover(
        function() {
            $(this).addClass('pulse');
        },
        function() {
            $(this).removeClass('pulse');
        }
    );
    
    // Lazy loading for images with fade-in effect
    const images = $('.image.featured img');
    const imageOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px 50px 0px"
    };
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                $(img).addClass('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, imageOptions);
    
    images.each(function() {
        imageObserver.observe(this);
    });
});