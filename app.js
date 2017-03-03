var sectionsList = [["#helloSection", "#helloLink"], ["#skillsSection", "#skillsLink"], ["#showcaseSection", "#showcaseLink"], ["#contactSection", "#contactLink"]];
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

if (mq.matches) {

}

sectionsList.forEach(function (linkData, index) {
    $(linkData[1]).click(function () {
        prevSection = index;

        $("#indicator").css("left", (index + 1) * 20 + "%");
        $("#indicator-line").css("width", $(this).children().first().width() + "px");
        $("#sectionHandle").css("left", index * -100 + "%");
    })
});