var sectionsList = [["#helloSection", "#helloLink"], ["#skillsSection", "#skillsLink"], ["#showcaseSection", "#showcaseLink"], ["#contactSection", "#contactLink"]];
var deltaY = 0;
var prevSection = 1;

$(document).mousewheel(function(event) {
    deltaY += event.deltaY;

    var prevSectionCopy = prevSection;

    if (prevSection <= sectionsList.length) {
        if (deltaY < -3) {
            $(sectionsList[prevSectionCopy][1]).click();
            deltaY = 0;
        }

        if (deltaY > 3) {
            $(sectionsList[prevSectionCopy - 2][1]).click();
            deltaY = 0;
        }
    }
});

sectionsList.forEach(function (linkData, index) {
    var altIndex = index;
    index++;
    $(linkData[1]).click(function () {
        prevSection = index;

        $("#indicator").css("left", (index) * 20 + "%");
        $("#indicator-line").css("width", $(this).children().first().width() + "px");


        $("#sectionHandle").css("left", altIndex * -100 + "%");
    })
});