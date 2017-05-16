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
var currentList, currentSlide, firstOpen, isPresenting;

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

                firstOpen = true;
                isPresenting = true;
                renderSlide(i, slide);

                $(window).keydown(function(e) {
                    if (e.which === 27) closeGallery();
                    if (e.which === 13 || e.which === 32 || e.which === 39) $("#next").click();
                    if (e.which === 37) $("#prev").click();
                });
            });
        })
    });

    $("#next").click(function () {
        if (currentSlide + 1 < galleries[currentList].length) {
            $("#gallery-details").hide();
            renderSlide(currentSlide + 1, galleries[currentList][currentSlide + 1], galleries[currentList].length);
            currentSlide++;
        }
    });

    $("#prev").click(function () {
        if (currentSlide > 0) {
            $("#gallery-details").hide();
            renderSlide(currentSlide - 1, galleries[currentList][currentSlide - 1], galleries[currentList].length);
            currentSlide--;
        }
    });

    $("#gallery-close").click(closeGallery);
}

function renderSlide(i, slide, length) {
    $("#gallery-caption").text(slide.attr("data-caption"));

    $("#number-current").text("0" + (i + 1));
    $("#gallery-details").fadeIn(1000);

    var imageObject = $("#gallery-image");
    var sizer = $("#gallery-sizer");

    if (firstOpen) {
        image = new Image();
        image.onload = onLoad;
        image.src = slide.attr("href");
    } else {
        imageObject.fadeOut(function () {
            image = new Image();
            image.onload = onLoad;
            image.src = slide.attr("href");
        });
    }

    firstOpen = false;

    var image, height, width, windowWidth, windowHeight, ratio;

    function onLoad() {
        height = image.height;
        width = image.width;

        windowWidth = $(window).width();
        windowHeight = $(window).height();

        if (width > windowWidth * .9) {
            ratio = height / width;
            width = windowWidth * .9;
            height = width * ratio;
        }

        if (height > (windowHeight * .9) - 90) {
            ratio = width / height;
            height = (windowHeight * .9) - 90;
            width = height * ratio;
        }

        sizer.width(width);
        sizer.height(height);

        $("#gallery-details").width(width + 8);

        setTimeout(function () {
            imageObject.fadeIn();

            imageObject.attr("src", slide.attr("href"));
        }, 500);
    }

    if (i === 0) $("#prev").invisible();
    else $("#prev").visible();

    if (i === length - 1) $("#next").invisible();
    else $("#next").visible();

}

function makeGallery() {
    var galleryNodes = $("<div class='gallery-overlay' id='gallery-overlay'></div><div class='gallery justify-content-center align-items-center flex-column' id='gallery'><div class='gallery__container' id='gallery-container'><div class='gallery__box'><div class='gallery__sizer d-flex justify-content-center align-items-center flex-row' id='gallery-sizer'><div class='gallery__spinner'><div class='spinner'></div></div><img src='' class='gallery__image' id='gallery-image'></div><div class='gallery__nav d-flex flex-row'><div class='gallery__nav__prev d-flex align-items-center' id='prev'><div class='arrow-left ml-3'></div></div><div class='gallery__nav__next d-flex align-items-center' id='next'><div class='arrow-right ml-auto mr-3'></div></div></div></div><div class='gallery__details d-flex flex-row' id='gallery-details'><div><div class='gallery__caption' id='gallery-caption'></div><div class='gallery__number pt-1' id='gallery-number'><span class='gallery__number--active' id='number-current'></span> / <span id='number-total'></span></div></div><div class='gallery__close ml-auto mt-auto d-flex flex-column justify-content-between' id='gallery-close'><div class='gallery__close-element'></div><div class='gallery__close-element'></div></div></div></div></div>");
    $("body").append(galleryNodes);

    $("#gallery").click(closeGallery);

    $("#gallery-container").click(function (e) {
        e.stopPropagation();
    });
}

function closeGallery() {
    var galleryObject = $("#gallery");
    isPresenting = false;
    galleryObject.fadeOut(function () {
        galleryObject.removeClass("gallery--top");
        galleryObject.invisible();
    });
    $("#gallery-image").hide();
    $("#gallery-overlay").fadeOut();
}