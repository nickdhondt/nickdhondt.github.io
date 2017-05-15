(function($) {
    $.fn.invisible = function() {
        return this.css("visibility", "hidden");
    };
    $.fn.visible = function() {
        return this.css("visibility", "visible");
    };
})(jQuery);

var galleryList = $('[data-gallery]');
var galleries = {};
var currentList, currentSlide;

makeGallery();
setup();

function setup() {
    galleryList.each(function () {
        if(galleries[$(this).data("gallery")] === undefined) galleries[$(this).data("gallery")] = [];
        galleries[$(this).data("gallery")].push($(this));
    });

    $.each(galleries, function (index, val) {
        $.each(val, function (i, slide) {
            slide.click(function (e) {
                var data = slide.data("gallery");
                currentList = data;
                currentSlide = i;

                e.preventDefault();
                $("#gallery-overlay").fadeIn();
                var gallery = $("#gallery");
                gallery.hide();
                gallery.fadeIn();
                gallery.addClass("gallery--top");
                gallery.visible();

                var length = galleries[data].length;
                if (length <= 9) length = "0" + length;
                $("#number-total").text(length);

                renderSlide(i, slide);
            });
        })
    });

    $("#next").click(function () {
        if (currentSlide < galleries[currentList].length) {
            renderSlide(currentSlide + 1, galleries[currentList][currentSlide + 1], galleries[currentList].length);
            currentSlide++;
        }
    });

    $("#prev").click(function () {
        if (currentSlide < galleries[currentList].length) {
            renderSlide(currentSlide - 1, galleries[currentList][currentSlide - 1], galleries[currentList].length);
            currentSlide--;
        }
    });
}

function renderSlide(i, slide, length) {
    $("#gallery-image").attr("src", slide.attr("href"));

    $("#gallery-caption").text(slide.attr("data-caption"));

    $("#number-current").text("0" + (i + 1));

    if (i === 0) $("#prev").invisible();
    else $("#prev").visible();

    if (i === length - 1) $("#next").invisible();
    else $("#next").visible();
}

function makeGallery() {
    var galleryNodes = $("<div class='gallery-overlay' id='gallery-overlay'></div><div class='gallery justify-content-center align-items-center flex-column' id='gallery'><div class='gallery__container' id='gallery-container'><div class='gallery__box'><img src='' class='gallery__image' id='gallery-image'><div class='gallery__nav d-flex flex-row'><div class='gallery__nav__prev d-flex align-items-center' id='prev'><div class='arrow-left ml-3'></div></div><div class='gallery__nav__next d-flex align-items-center' id='next'><div class='arrow-right ml-auto mr-3'></div></div></div></div><div class='gallery__details'><div class='gallery__caption' id='gallery-caption'></div><div class='gallery__number' id='gallery-number'><span class='gallery__number--active' id='number-current'></span> / <span id='number-total'></span></div></div></div></div>");
    $("body").append(galleryNodes);

    $("#gallery").click(function () {
        $(this).fadeOut("slow", function () {
            $(this).removeClass("gallery--top");
            $(this).invisible();
        });
        $("#gallery-overlay").fadeOut();
    });

    $("#gallery-container").click(function (e) {
        e.stopPropagation();
    });
}