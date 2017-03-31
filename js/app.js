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