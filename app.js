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
    index++;
    $(linkData[1]).click(function () {
        prevSection = index;
        sectionsList.forEach(function (data, i) {
            i++;
            if (index > i) $(data[0]).css("left", -100 * (index - i) + "%");
            else $(data[0]).css("left", 100 * (i - index) + "%");
        });

        $("#indicator").css("left", (index) * 20 + "%");
        $("#indicator-line").css("width", $(this).children().first().width() + "px");

        $(linkData[0]).css("left", "0");
    })
});