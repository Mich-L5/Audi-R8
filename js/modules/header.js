document.addEventListener("DOMContentLoaded", (loaded) => {

    /* --------------------------------------- */
    /*              HAMBURGER MENU             */
    /* --------------------------------------- */

    function hamburgerMenu(header) {

        // Get burger element
        let hamburger = document.querySelector(".hamburger");
        // Get menu element
        let menu = document.querySelector("nav ul");
        // Get wrapper element
        let wrapper = document.querySelector(".wrapper");

        // Variable to toggle menu on/off
        let toggle = 0;

        // Open/close hamburger menu
        function toggleMenu() {
            // if menu is closed, open it, add menu wrapper, and darken header
            if (toggle == 0) {
                toggle = 1;
                menu.classList.add("open-menu");
                header.classList.add("darken-header");
                wrapper.classList.add("wrapper-active");
            }

            // If menu is opened, close it, remove menu wrapper, and remove darkened header class
            else {
                toggle = 0;
                menu.classList.remove("open-menu");
                header.classList.remove("darken-header");
                wrapper.classList.remove("wrapper-active");
            }
        }

        // Add click event listener to hamburger
        hamburger.addEventListener("click", toggleMenu);

        // Add click event listener to menu bg
        wrapper.addEventListener("click", function () {
            // if menu is open and menu bg is clicked on, close the menu
            if (toggle == 1) {
                toggle = 0;
                menu.classList.remove("open-menu");
                header.classList.remove("darken-header");
                wrapper.classList.remove("wrapper-active");
            }
        });

        // Remove the transition effect on header when menu resizes from desktop to mobile
        function removeMenuTransition() {
            // if window is in the menu transition width (range is extended because if it's too close to the breakpoint (i.e. 767-769), we can still see the menu transitioning
            if (window.innerWidth >= 700 && window.innerWidth <= 800) {
                // remove the transition property (so that we can't see the menu transition from desktop to mobile position)
                menu.style.transition = "none";

                // add the transition property back right after
                function addMenuTransition() {
                    menu.style.transition = "0.5s all ease";
                }

                setTimeout(addMenuTransition, 500);
            }
        }
        window.addEventListener("resize", removeMenuTransition);
    }

    /* --------------------------------------- */
    /*         DISPLAY HEADER ON SCROLL        */
    /* --------------------------------------- */

    let header;

    function initializeHeader() {
        // Check if we are on the home page
        if (document.getElementById("home-page")) {

            header = document.getElementById("header-fade-in");

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
        } else {
            let header = document.getElementById("static-header");
        }

        hamburgerMenu(header);
    }

    initializeHeader();

});