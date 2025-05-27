document.addEventListener("DOMContentLoaded", (loaded) => {

    /* --------------------------------------- */
    /*      SCROLL HEADLIGHTS TURN ON          */
    /* --------------------------------------- */
    document.addEventListener('scroll', function () {

        // Get the lightsOn section
        const lightsOn = document.querySelector('.lightsOn');

        // Calculate how much of the section has been scrolled
        const sectionTop = lightsOn.getBoundingClientRect().top;

        // Calculate the height of the lightsOn
        const lightsOnHeight = lightsOn.offsetHeight;

        // Calculate how much of the section is left to scroll
        const lightsOnLeftToScroll = lightsOnHeight - scrollY;
        const lightsOnLeftToScrollPercent = (lightsOnLeftToScroll / lightsOnHeight);

        // Calculate the opacity of the lightsOn section and apply styling 
        const newOpacity = (1 - lightsOnLeftToScrollPercent) * 5;
        lightsOn.style.opacity = newOpacity;

        // Calculate the opacity of the clouds and apply styling
        const clouds = document.querySelectorAll('.whiteCloud');

        let newCloudOpacity = 1 - newOpacity;

        if (newCloudOpacity < 0.3) {
            newCloudOpacity = 0.3;
        }

        if (newOpacity > 0) {
            clouds.forEach((cloud) => {
                cloud.style.setProperty('opacity', newCloudOpacity, 'important');
            });
        }



    });

});