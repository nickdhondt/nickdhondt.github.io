var sectionsList = [["#helloSection", "#helloLink"], ["#skillsSection", "#skillsLink"], ["#showcaseSection", "#showcaseLink"], ["#contactSection", "#contactLink"]];
var detailsList = [["#roomDetail", "#roomDetailLink"], ["#luckyMealDetail", "#luckyMealDetailLink"], ["#rtddDetail", "#rtddDetailLink"], ["#interbellumDetail", "#interbellumDetailLink"], ["#cleansingDetail", "#cleansingDetailLink"], ["#nkDetail", "#nkDetailLink"]];
var deltaY = 0;
var prevSection = 0;
var mq = window.matchMedia("(min-width: 768px)");

// $(document).mousewheel(function(event) {
//     if(deltaY < 0 && event.deltaY > 0) deltaY = 0;
//     else if (deltaY > 0 && event.deltaY < 0) deltaY = 0;
//     deltaY += event.deltaY;
//
//     if (prevSection <= sectionsList.length) {
//         if (deltaY < -3 && sectionsList[prevSection + 1] !== undefined) {
//             $(sectionsList[prevSection + 1][1]).click();
//             deltaY = 0;
//         }
//
//         if (deltaY > 3 && sectionsList[prevSection - 1] !== undefined) {
//             $(sectionsList[prevSection - 1][1]).click();
//             deltaY = 0;
//         }
//     }
// });

$("#toggleNav").click(function () {
    var nav = $("nav").first();
    if (nav.hasClass("nav-open")) nav.removeClass("nav-open");
    else nav.addClass("nav-open");
});

detailsList.forEach(function (linkData, index) {
    $(linkData[1]).click(function () {
        $(linkData[0]).removeClass("detail--hidden");
        $("#detailsContainer").removeClass("details--hidden").removeClass("details--small");
    })
});

$("#detailsContainer").click(function () {
    var thisContainer = $(this);
    thisContainer.addClass("details--small");
    setTimeout(function () {
        thisContainer.addClass("details--hidden");
    }, 500);

    detailsList.forEach(function (linkData, index) {
        setTimeout(function () {
            $(linkData[0]).addClass("detail--hidden");
        }, 500);
    });
});

sectionsList.forEach(function (linkData, index) {
    $(linkData[1]).click(function () {
        prevSection = index;

        if (mq.matches) {
            $("#indicator").css("left", index * 25 + "%");
        } else {
            $("#indicator").css("top", index * 25 + "%");
        }
        $("#indicator-line").css("width", $(this).children().first().width() + "px");
        $("#sectionHandle").css("left", index * -100 + "%");
    })
});