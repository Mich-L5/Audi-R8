document.addEventListener("DOMContentLoaded",(loaded) => {

    /* --------------------------------------- */
    /*             CUSTOM SCROLLBAR            */
    /* --------------------------------------- */

    function customScrollBar() {
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
    }

    customScrollBar();

});