$(window).resize(function () {
    calculateCatcherBgWidth();
});

calculateCatcherBgWidth();

$("#toggle-menu").click(function () {
    var hamburger = $(this);
    var panel = $("#panel");

    if (hamburger.hasClass("hamburger--open")) {
        hamburger.removeClass("hamburger--open");
        panel.removeClass("navigation-panel--open");
    } else {
        hamburger.addClass("hamburger--open");
        panel.addClass("navigation-panel--open");
    }
});

function calculateCatcherBgWidth() {
    var catcher, catcherBg;
    catcher = $("#catcher");
    catcherBg = $("#catcher-bg");

    if (catcher.offset()) {
        if (window.matchMedia("(min-width: 768px)").matches) {
            var bg = $("#bg-section-one");
            catcherBg.css("width", (catcher.offset().left + catcher.outerWidth()) - bg.width() + "px");
        } else {
            catcherBg.css("width", "100%");
        }
    }
}