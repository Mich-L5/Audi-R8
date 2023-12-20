document.addEventListener("DOMContentLoaded",(loaded) => {

    /* --------------------------------------- */
    /*     MASTHEAD BG - FADE CAR LIGHTS ON    */
    /* --------------------------------------- */

    function fadeInCarLights() {
        // check if we are on the home page
        if (document.getElementById("home-page")) {

            var mastheadBG = document.getElementById("home-masthead-overlay-img");

            // Variable to calculate the second bg image opacity based on how far user has scrolled
            let scrollPercent = 0;

            // Whenever the user scrolls or resizes the window, call adjustLightsBg
            window.addEventListener("scroll", adjustLightsBg);
            window.addEventListener("resize", adjustLightsBg);

            function adjustLightsBg() {
                if (window.innerWidth > 768) {
                    turnOnHeadlights(220);
                }
                else if (window.innerWidth > 480) {
                    turnOnHeadlights(120);
                }
                else {
                    turnOnHeadlights(100);
                }

                function turnOnHeadlights(scrollDistance) {
                    // Set bg elements to the same height
                    let bgHeight = document.getElementById("home-masthead-img").offsetHeight;
                    document.getElementById("home-masthead-overlay-img").style.height = bgHeight + "px";


                    // If the user is scrolling between 0px-scroll distance on the y axis
                    scrollPercent = (window.scrollY)/scrollDistance;

                    if (scrollPercent <= scrollDistance) {

                        // Gradually fade in the second background image
                        mastheadBG.style.backgroundImage = "url('./img/r8-front-view-lights-on.jpg')";
                        mastheadBG.style.opacity = scrollPercent;
                    }
                }
            }
        }
    }

    fadeInCarLights();

    /* --------------------------------------- */
    /*       ADJUST MASTHEAD HEIGHT WHEN       */
    /*               VH <= 1170PX              */
    /* --------------------------------------- */

    function adjustMasthead() {
        var width = window.innerWidth;

        // check if we are on the home page

        if (document.getElementById("home-page"))
        {
            var mastheadBg = document.getElementById("home-masthead-img");
            let height = window.innerHeight;

            function resizeMasthead() {

                // get window width
                width = window.innerWidth;

                if (width <= 1170) {

                    // map current width to the range below:
                    // 320px W = 245px H, 1170px W = 780px H
                    height = window.innerHeight;
                    let newHeight = (780 - 245) * (width - 320) / (1170 - 320) + 245;
                    mastheadBg.style.height = newHeight + "px";

                } else {
                    mastheadBg.style.height = "100vh";
                }
            }

            // invoke resizeMasthead on load and whenever window is resized
            resizeMasthead();
            window.addEventListener("resize", resizeMasthead);
        }
    }

    adjustMasthead();

});