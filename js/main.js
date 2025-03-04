document.addEventListener("DOMContentLoaded", (loaded) => {

    /* --------------------------------------- */
    /*             CUSTOM SCROLLBAR            */
    /* --------------------------------------- */

    function customScrollBar() {
        if (window.innerWidth >= 1024) {

            // Scrollbar functionality
            let docHeight = document.body.scrollHeight - window.innerHeight;
            window.addEventListener("scroll", scrollbar);
            window.addEventListener("resize", scrollbar);

            function scrollbar() {

                docHeight = document.body.scrollHeight - window.innerHeight;

                // Calculate the percentage of the window that is currently scrolled down
                // Using 96% instead of 100% so that the thumb icon does not go off screen
                let percentage = ((window.scrollY / docHeight) * 96);

                // Prevent icon from going all the way to the bottom
                if (percentage > 96) {
                    percentage = 96
                }

                document.getElementById("scrollbar-thumb").style.top = (percentage) + "%";
            }

            // Scrollbar fade in/out on scroll
            window.addEventListener("scroll", scrollbarFade);

            let fadeOut;

            function scrollbarFade() {

                // Clear previous timeout (if the user keeps on scrolling)
                clearTimeout(fadeOut);

                document.getElementById("thumb-container").style.opacity = 1;

                // Timeout to fade scrollbar back out
                fadeOut = setTimeout(scrollbarFadeOut, 1000);
            }

            function scrollbarFadeOut() {
                document.getElementById("thumb-container").style.opacity = 0;
            }
        }
    }

    customScrollBar();

});