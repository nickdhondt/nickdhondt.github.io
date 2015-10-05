"use strict";

window.addEventListener("DOMContentLoaded", function(){application.init()});

var application = application || {};

application = {
    interval: -1,
    sectionIndex: {
        lander: ["lander"],
        projects: ["projects"],
        skills: ["skills"],
        contact: ["contact"]
    },
    canvasIndex: {
        firstProject: ["first_project_canvas"],
        secondProject: ["second_project_canvas"],
        thirdProject: ["third_project_canvas"]
    },
    init: function() {
        var landingRef = document.getElementsByClassName("lander_ref");
        for(var i = 0; i < landingRef.length; i++) {
            landingRef[i].addEventListener("click", function(){application.scrollTo("lander")});
        }

        var projectsRef = document.getElementsByClassName("projects_ref");
        for(var j = 0; j < projectsRef.length; j++) {
            projectsRef[j].addEventListener("click", function(){application.scrollTo("projects")});
        }

        var skillsRef = document.getElementsByClassName("skills_ref");
        for(var k = 0; k < skillsRef.length; k++) {
            skillsRef[k].addEventListener("click", function(){application.scrollTo("skills")});
        }

        var contactRef = document.getElementsByClassName("contact_ref");
        for(var m = 0; m < contactRef.length; m++) {
            contactRef[m].addEventListener("click", function(){application.scrollTo("contact")});
        }

        document.getElementById("first_project_ref").addEventListener("click", function(){application.showCanvas("firstProject"); application.closeEvent("firstProject")});
        document.getElementById("second_project_ref").addEventListener("click", function(){application.showCanvas("secondProject"); application.closeEvent("secondProject")});
        document.getElementById("third_project_ref").addEventListener("click", function(){application.showCanvas("thirdProject"); application.closeEvent("thirdProject")});
        document.getElementById("canvas").addEventListener("click", function(){application.hideCanvas()});

        application.preventCanvasEvents();
        application.scrollNav();
        application.transition();
    },
    closeEvent: function(canvas) {
        document.getElementById(application.canvasIndex[canvas][0]).children[0].children[0].addEventListener("click", function(){application.hideCanvas()});
    },
    preventCanvasEvents: function() {
        var canvasElements = document.getElementById("canvas").children;

        for(var i = 0; i < canvasElements.length; i++) {
            canvasElements[i].children[0].addEventListener("click", function(e){e.stopPropagation()});
        }
    },
    showCanvas: function(canvas) {
        document.getElementById(application.canvasIndex[canvas][0]).className = "visible";
    },
    hideCanvas: function(canvas) {
        for(var object in application.canvasIndex) {
            if (application.canvasIndex.hasOwnProperty(object)) {
                document.getElementById(application.canvasIndex[object][0]).className = "invisible";
            }
        }
    },
    transition: function() {
        setTimeout(function(){document.getElementById("lander").firstElementChild.childNodes[1].className = "opaque";}, 500);
        setTimeout(function(){document.getElementById("lander").firstElementChild.childNodes[3].className = "opaque";}, 2500);
        setTimeout(function(){document.getElementById("lander").firstElementChild.childNodes[5].className = "opaque";}, 4500);
    },
    scrollNav: function() {
        var nav = document.getElementsByTagName("nav")[0];

        document.addEventListener("scroll", function(){
            if (window.scrollY >= 1) {
                nav.id = "compact";
            } else {
                nav.id = "";
            }
        });
    },
    scrollTo: function(sectionName) {
        window.smoothScroll(document.getElementById(application.sectionIndex[sectionName][0]), 1000);
    }
};