$(document).ready(function() {
    $(".owl-carousel").owlCarousel({
        loop: !0,
        margin: 30,
        autoplay: !0,
        autoplayHoverPause: !0,
        slideBy: 3,
        mouseDrag: !1,
        dotsContainer: ".owl-dots",
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    })
});

