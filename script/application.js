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

        application.scrollNav();
        application.transition();
    },
    transition: function() {
        document.getElementById("lander").firstElementChild.style.transition = "opacity 2s ease";
        document.getElementById("lander").firstElementChild.style.opacity = "0";
        setTimeout(function(){document.getElementById("lander").firstElementChild.style.opacity = "1";}, 1);
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