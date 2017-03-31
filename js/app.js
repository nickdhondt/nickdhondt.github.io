$( window ).resize(function() {
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
    var width, catcher;
    if (window.matchMedia("(min-width: 768px)").matches) {
        var bg = $("#bg-section-one");
        catcher = $("#catcher");
        width = (catcher.offset().left + catcher.outerWidth()) - bg.width();
    } else {
        catcher = $("#catcher");
        width = catcher.outerWidth();
    }
    $("#catcher-bg").css("width", width + "px");
}