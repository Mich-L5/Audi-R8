document.addEventListener('DOMContentLoaded',(loaded) => {

    /* --------------------------------------- */
    /*     MASTHEAD BG - FADE CAR LIGHTS ON    */
    /* --------------------------------------- */

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

    /* --------------------------------------- */
    /*       ADJUST MASTHEAD HEIGHT WHEN       */
    /*               VH <= 1170PX              */
    /* --------------------------------------- */
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
                mastheadBg.style.height = newHeight + 'px';

            } else {
                mastheadBg.style.height = "100vh";
            }
        }

        // invoke resizeMasthead on load and whenever window is resized
        resizeMasthead();
        window.addEventListener('resize', resizeMasthead);
    }



    /* --------------------------------------- */
    /*             CUSTOM SCROLLBAR            */
    /* --------------------------------------- */

    if (window.innerWidth >= 1024) {
        // scrollbar functionality
        var docHeight = document.body.scrollHeight - window.innerHeight;
        window.addEventListener("scroll", scrollbar);
        window.addEventListener("resize", scrollbar);

        function scrollbar() {

            docHeight = document.body.scrollHeight - window.innerHeight;

            // calculate the percentage of the window that is currently scrolled down
            // using 96% instead of 100% so that the thumb icon does not go off screen
            let percentage = ((window.scrollY/docHeight) * 96);

            // prevent icon from going all the way to the bottom
            if (percentage > 96) {
                percentage = 96
            }

            document.getElementById("scrollbar-thumb").style.top = (percentage) + "%";
        }

        // scrollbar fade in/out on scroll
        window.addEventListener("scroll", scrollbarFade);

        let fadeOut;

        function scrollbarFade() {

            // clear previous timeout (if the user keeps on scrolling)
            clearTimeout(fadeOut);

            document.getElementById("thumb-container").style.opacity = 1;

            // timeout to fade scrollbar back out
            fadeOut = setTimeout(scrollbarFadeOut, 1000);
        }

        function scrollbarFadeOut() {
            document.getElementById("thumb-container").style.opacity = 0;
        }
    }

});