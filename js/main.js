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
    /*         DISPLAY HEADER ON SCROLL        */
    /* --------------------------------------- */

    // check if we are on the home page
    if (document.getElementById("home-page"))
    {
        var header = document.getElementById("header-fade-in");

        function showHeader() {

            let scrollDistance;

            // Desktop
            if (window.innerWidth > 768) {
                scrollDistance = 500;
            }
            // Tablet
            else if (window.innerWidth > 480) {
                scrollDistance = 350;
            }
            // Mobile
            else {
                scrollDistance = 150;
            }

            if (window.scrollY > scrollDistance) {
                header.classList.add("show-header");
            } else {
                header.classList.remove("show-header");
            }
        }
        window.addEventListener("scroll", showHeader);
    }

    else {
        var header = document.getElementById("static-header");
    }

    /* --------------------------------------- */
    /*              HAMBURGER MENU             */
    /* --------------------------------------- */

    // get burger element
    var hamburger = document.querySelector(".hamburger");
    // get menu element
    var menu = document.querySelector("nav ul");
    // get wrapper element
    var wrapper = document.querySelector(".wrapper");

    // variable to toggle menu on/off
    var toggle = 0;

    // open/close hamburger menu
    function toggleMenu() {
        // if menu is closed, open it, add menu wrapper, and darken header
        if (toggle == 0) {
            toggle = 1;
            menu.classList.add("open-menu");
            header.classList.add("darken-header");
            wrapper.classList.add("wrapper-active");
        }

        // if menu is opened, close it, remove menu wrapper, and remove darkened header class
        else {
            toggle = 0;
            menu.classList.remove("open-menu");
            header.classList.remove("darken-header");
            wrapper.classList.remove("wrapper-active");
        }
    }

    // add click event listener to hamburger
    hamburger.addEventListener('click', toggleMenu);

    // add click event listener to menu bg
    wrapper.addEventListener('click', function() {
        // if menu is open and menu bg is clicked on, close the menu
        if (toggle == 1) {
            toggle = 0;
            menu.classList.remove("open-menu");
            header.classList.remove("darken-header");
            wrapper.classList.remove("wrapper-active");
        }
    });

    // remove the transition effect on header when menu resizes from desktop to mobile
    function removeMenuTransition() {
        // if window is in the menu transition width (range is extended because if it's too close to the breakpoint (i.e. 767-769), we can still see the menu transitioning
        if (width >= 700 && width <= 800) {
            // remove the transition property (so that we can't see the menu transition from desktop to mobile position)
            menu.style.transition = 'none';

            // add the transition property back right after
            function addMenuTransition() {
                menu.style.transition = '0.5s all ease';
            }
            setTimeout(addMenuTransition, 500);
        }
    }
    window.addEventListener('resize', removeMenuTransition);



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