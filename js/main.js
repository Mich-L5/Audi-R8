document.addEventListener('DOMContentLoaded',(loaded) => {

    // get part of the path name to later check if we are on the home page
    // **specific to Netlify's URL**
    var pathCheck = window.location.href.slice(-20);
    // (old pathCheck variable for local testing)
    //var pathCheck = window.location.pathname.slice(-8);

    /* --------------------------------------- */
    /*     Masthead BG - fade car lights on    */
    /* --------------------------------------- */

    // check if we are on index.html or homepage (without extension)
    if (document.URL.includes("index.html") || pathCheck.includes("audi-r8")) {

        var mastheadBG = document.querySelector(".masthead-image");

        function lightsONfade() {
            mastheadBG.classList.add("lights-on-fade");
        }

        window.setTimeout(lightsONfade, 300);
    }

    /* --------------------------------------- */
    /*      Set customized car image & text    */
    /* --------------------------------------- */

    // check if we are on index.html, product.html or homepage (without extension)
    if (document.URL.includes("index") || document.URL.includes("product") || pathCheck.includes("audi-r8")) {

        /* ------------------------- */
        /*    1. Get DOM elements    */
        /* ------------------------- */

        // get img element
        var img = document.querySelector(".customize-img");

        // get gradient bar element
        var bar = document.querySelector(".color-bar");

        // get button elements
        var allTrimBtns = document.querySelectorAll('.car-trim-btn');
        var coupeBtn = document.querySelectorAll('.car-trim-btn')[0];
        var spyderBtn = document.querySelectorAll('.car-trim-btn')[1];

        // get color square elements
        var allColorSq = document.querySelectorAll('.color-option-container');
        var bkSq = document.querySelectorAll('.color-option-container')[0];
        var chSq = document.querySelectorAll('.color-option-container')[1];
        var slSq = document.querySelectorAll('.color-option-container')[2];
        var whSq = document.querySelectorAll('.color-option-container')[3];
        var nvSq = document.querySelectorAll('.color-option-container')[4];
        var blSq = document.querySelectorAll('.color-option-container')[5];
        var ywSq = document.querySelectorAll('.color-option-container')[6];
        var rdSq = document.querySelectorAll('.color-option-container')[7];

        // get rims/wheels square elements
        var allRimssq = document.querySelectorAll('.wheel-selector-container img');
        var bkRimsSq = document.querySelectorAll('.wheel-selector-container img')[0];
        var glRimsSq = document.querySelectorAll('.wheel-selector-container img')[1];

        // get text elements
        var bodyColorText = document.getElementById("color-choice");
        var rimsColorText = document.getElementById("wheel-choice");
        var priceText = document.getElementById("price");

        /* ------------------------- */
        /*       2. Set vars         */
        /* ------------------------- */

        // set default img path variables
        var trim = "cp-";
        var body = "bk-";
        var rims = "bk";

        // set default img path
        var imgDir = "./img/customize/";
        var imgPath = "r8-" + trim + body + rims;

        // set default alt tag values
        var carTrim = "coupe";
        var carColor = "black";
        var rimsColor = "black";

        /* ------------------------- */
        /*    3. Helper functions    */
        /* ------------------------- */

        // IMAGE
        // function to update image path and alt tag
        function updateImg() {
            imgPath = "r8-" + trim + body + rims + ".jpg";
            img.setAttribute('src', imgDir + imgPath);
            img.setAttribute('alt', "a " + carColor + " " +
                "Audi R8 " + carTrim + " with " + rimsColor + " rims ");
        }

        // CAR TRIM
        // function to update customized car image when trim change occurs
        function trimChange(trimChange, trimAlt, btn) {

            // deselected all buttons (style wise)
            for (let i = 0; i < allTrimBtns.length; i++) {
                allTrimBtns[i].classList.remove("selected-btn");
                allTrimBtns[i].classList.add("unselected-btn");
            }

            // only select the button that has been clicked on (style wise)
            btn.classList.add("selected-btn");
            btn.classList.remove("unselected-btn");

            trim = trimChange;
            carTrim = trimAlt;
            updateImg();

            // update price
            // spyder
            if (btn.innerHTML == "<div>Spyder</div>") {
                priceText.innerText = "Starting at $171,000"
            }
            // coupe
            else {
                priceText.innerText = "Starting at $158,600"
            }
        }

        // CAR BODY COLOR
        // function to update customized car image when body color change occurs
        function bodyColorChange(bodyChange, bodyAlt, sq, colorText) {

            // deselected all squares (style wise)
            for (let i = 0; i < allColorSq.length; i++) {
                allColorSq[i].classList.remove("selected");
            }

            // only select the square that has been clicked on (style wise)
            sq.classList.add("selected");

            body = bodyChange;
            carColor = bodyAlt;
            updateImg();

            // update the gradient bar color
            // get color square background value
            let bgColor = sq.childNodes;
            let bgProperty = getComputedStyle(bgColor[0]).getPropertyValue("background-image");
            // get the color value
            let colorValue = bgProperty.split(" ", 6);
            colorValue = colorValue[3] + colorValue[4] + colorValue[5];
            let rgb = colorValue.slice(0, colorValue.length - 1);
            // update the bar's color
            bar.style.backgroundImage = "linear-gradient(to right, white," + rgb + ",white)";

            // update text
            bodyColorText.innerText = colorText;
        }

        // CAR WHEELS/RIMS
        // function to update customized car image when rims/wheels change occurs
        function rimsChange(rimsChange, rimsAlt, sq, rimsText) {

            // deselected all squares (style wise)
            allRimssq[0].classList.remove("selected");
            allRimssq[1].classList.remove("selected");

            // only select the square that has been clicked on (style wise)
            sq.classList.add("selected");

            rims = rimsChange;
            rimsColor = rimsAlt;
            updateImg();

            // update text
            rimsColorText.innerText = rimsText;
        }

        /* ------------------------- */
        /*  4. EventListener (click) */
        /*           functions       */
        /* ------------------------- */

        // CAR TRIM
        // update custom image when button is clicked
        // coupe btn
        coupeBtn.addEventListener("click", function () {
            trimChange("cp-", "coupe", coupeBtn);
        });

        // spyder btn
        spyderBtn.addEventListener("click", function () {
            trimChange("sp-", "spyder", spyderBtn);
        });

        // CAR BODY COLOR
        // update custom image when square is clicked
        // black square
        bkSq.addEventListener("click", function () {
            bodyColorChange("bk-", "black", bkSq, "Mythos Black Metallic");
        });

        // charcoal square
        chSq.addEventListener("click", function () {
            bodyColorChange("ch-", "charcoal", chSq, "Daytona Grey Pearlescent");
        });

        // silver square
        slSq.addEventListener("click", function () {
            bodyColorChange("sl-", "silver", slSq, "Suzuka Grey Metallic");
        });

        // white square
        whSq.addEventListener("click", function () {
            bodyColorChange("wh-", "white", whSq, "Ibis White");
        });

        // navy square
        nvSq.addEventListener("click", function () {
            bodyColorChange("nv-", "navy", nvSq, "Ascari Blue Metallic");
        });

        // blue square
        blSq.addEventListener("click", function () {
            bodyColorChange("bl-", "blue", blSq, "Ara Blue crystal");
        });

        // yellow square
        ywSq.addEventListener("click", function () {
            bodyColorChange("yw-", "yellow", ywSq, "Vegas Yellow");
        });

        // red square
        rdSq.addEventListener("click", function () {
            bodyColorChange("rd-", "red", rdSq, "Tango Red Metallic");
        });

        // CAR WHEELS/RIMS
        // update custom image when square is clicked
        // black rims square
        bkRimsSq.addEventListener("click", function () {
            rimsChange("bk", "black", bkRimsSq, "20\" milled cut design, anthracite black wheels");
        });

        // gold rims square
        glRimsSq.addEventListener("click", function () {
            rimsChange("gl", "gold", glRimsSq, "20\" 5-V-spoke evo design, matte bronze wheels");
        });
    }

    /* --------------------------------------- */
    /*       Adjust masthead height when       */
    /*               vh <= 1170px              */
    /* --------------------------------------- */
    var width = window.innerWidth;

    // check if we are on index.html or homepage (without extension)
    if (document.URL.includes("index.html") || pathCheck.includes("audi-r8")) {

        var mastheadBg = document.getElementById("home-masthead-img");
        let height = window.innerHeight;

        function resizeMasthead() {

            // get window width
            width = window.innerWidth;

            if (width <= 1170) {

                // map current width to the range below:
                // 320px W = 245px H, 1170px W = 770px H
                height = window.innerHeight;
                let newHeight = (770 - 245) * (width - 320) / (1170 - 320) + 245;
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
    /*         Display header on scroll        */
    /* --------------------------------------- */

    // check if we are on index.html or homepage (without extension)
    if (document.URL.includes("index.html") || pathCheck.includes("audi-r8")) {

        var header = document.getElementById("header-fade-in");

        function showHeader() {
            if (window.scrollY > 120) {
                header.classList.add("show-header");
            } else {
                header.classList.remove("show-header");
            }
        }
        window.addEventListener('scroll', showHeader);
    }

    else {
        var header = document.getElementById("static-header");
    }

    /* --------------------------------------- */
    /*              Hamburger menu             */
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
    /*    Car configuration drop down menu     */
    /* --------------------------------------- */

    if (document.URL.includes("product")) {

        // get the selected configuration name
        var configSelected = document.getElementById("config-selected");

        // get the dropdown menu and its value
        var configMenu = document.getElementById("config-menu");
        var configMenuValue = document.getElementById("config-menu").value;

        // get the table value elements
        var configPrice = document.querySelectorAll(".config-price");
        var configEngine = document.querySelectorAll(".config-engine");
        var configTransmission = document.querySelectorAll(".config-transmission");
        var configDrivetrain = document.querySelectorAll(".config-drivetrain");
        var configFuel = document.querySelectorAll(".config-fuel");
        var configHP = document.querySelectorAll(".config-hp");
        var configTorque = document.querySelectorAll(".config-torque");

        // function to update the configuration table based on which value is selected from dropdown menu
        function updateConfigTable() {
            configMenuValue = document.getElementById("config-menu").value;

            // switch statement to display table values based on option selected
            switch(configMenuValue) {
                case "1":
                    configPrice[0].textContent = "$158,600";
                    configPrice[1].textContent = "$158,600";
                    configEngine[0].textContent = "5.2L V10 Gas";
                    configEngine[1].textContent = "5.2L V10 Gas";
                    configTransmission[0].textContent = "7-Speed Automatic";
                    configTransmission[1].textContent = "7-Speed Automatic";
                    configDrivetrain[0].textContent = "Rear-Wheel Drive";
                    configDrivetrain[1].textContent = "Rear-Wheel Drive";
                    configFuel[0].innerHTML = "City: 14 MPG\n" +
                        "                    <span>Hwy: 23 MPG</span>";
                    configFuel[1].innerHTML = "City: 14 MPG\n" +
                        "                    <span>Hwy: 23 MPG</span>";
                    configHP[0].textContent = "562 hp @ 4475 rpm";
                    configHP[1].textContent = "562 hp @ 4475 rpm";
                    configTorque[0].textContent = "406 lb-ft @ 6300 rpm";
                    configTorque[1].textContent = "406 lb-ft @ 6300 rpm";
                    configSelected.textContent = "Coupe V10 performance RWD";
                    break;

                case "2":
                    configPrice[0].textContent = "$209,700";
                    configPrice[1].textContent = "$209,700";
                    configEngine[0].textContent = "5.2L V10 Gas";
                    configEngine[1].textContent = "5.2L V10 Gas";
                    configTransmission[0].textContent = "7-Speed Automatic";
                    configTransmission[1].textContent = "7-Speed Automatic";
                    configDrivetrain[0].textContent = "All-Wheel Drive";
                    configDrivetrain[1].textContent = "All-Wheel Drive";
                    configFuel[0].innerHTML = "City: 13 MPG\n" +
                        "                    <span>Hwy: 18 MPG</span>";
                    configFuel[1].innerHTML = "City: 13 MPG\n" +
                        "                    <span>Hwy: 18 MPG</span>";
                    configHP[0].textContent = "602 hp @ 8100 rpm";
                    configHP[1].textContent = "602 hp @ 8100 rpm";
                    configTorque[0].textContent = "413 lb-ft @ 6700 rpm";
                    configTorque[1].textContent = "413 lb-ft @ 6700 rpm";
                    configSelected.textContent = "Coupe V10 performance quattro";
                    break;

                case "3":
                    configPrice[0].textContent = "$249,900";
                    configPrice[1].textContent = "$249,900";
                    configEngine[0].textContent = "5.2L V10 Gas";
                    configEngine[1].textContent = "5.2L V10 Gas";
                    configTransmission[0].textContent = "7-Speed Automatic";
                    configTransmission[1].textContent = "7-Speed Automatic";
                    configDrivetrain[0].textContent = "Rear-Wheel Drive";
                    configDrivetrain[1].textContent = "Rear-Wheel Drive";
                    configFuel[0].innerHTML = "City: 14 MPG\n" +
                        "                    <span>Hwy: 21 MPG</span>";
                    configFuel[1].innerHTML = "City: 14 MPG\n" +
                        "                    <span>Hwy: 21 MPG</span>";
                    configHP[0].textContent = "602 hp @ 8100 rpm";
                    configHP[1].textContent = "602 hp @ 8100 rpm";
                    configTorque[0].textContent = "413 lb-ft @ 6700 rpm";
                    configTorque[1].textContent = "413 lb-ft @ 6700 rpm";
                    configSelected.textContent = "Coupe GT RWD";
                    break;

                case "4":
                    configPrice[0].textContent = "$171,000";
                    configPrice[1].textContent = "$171,000";
                    configEngine[0].textContent = "5.2L V10 Gas";
                    configEngine[1].textContent = "5.2L V10 Gas";
                    configTransmission[0].textContent = "7-Speed Automatic";
                    configTransmission[1].textContent = "7-Speed Automatic";
                    configDrivetrain[0].textContent = "Rear-Wheel Drive";
                    configDrivetrain[1].textContent = "Rear-Wheel Drive";
                    configFuel[0].innerHTML = "City: 14 MPG\n" +
                        "                    <span>Hwy: 23 MPG</span>";
                    configFuel[1].innerHTML = "City: 14 MPG\n" +
                        "                    <span>Hwy: 23 MPG</span>";
                    configHP[0].textContent = "562 hp @ 4475 rpm";
                    configHP[1].textContent = "562 hp @ 4475 rpm";
                    configTorque[0].textContent = "406 lb-ft @ 6300 rpm";
                    configTorque[1].textContent = "406 lb-ft @ 6300 rpm";
                    configSelected.textContent = "Spyder V10 performance RWD";
                    break;

                case "5":
                    configPrice[0].textContent = "$222,100";
                    configPrice[1].textContent = "$222,100";
                    configEngine[0].textContent = "5.2L V10 Gas";
                    configEngine[1].textContent = "5.2L V10 Gas";
                    configTransmission[0].textContent = "7-Speed Automatic";
                    configTransmission[1].textContent = "7-Speed Automatic";
                    configDrivetrain[0].textContent = "All-Wheel Drive";
                    configDrivetrain[1].textContent = "All-Wheel Drive";
                    configFuel[0].innerHTML = "City: 13 MPG\n" +
                        "                    <span>Hwy: 18 MPG</span>";
                    configFuel[1].innerHTML = "City: 13 MPG\n" +
                        "                    <span>Hwy: 18 MPG</span>";
                    configHP[0].textContent = "602 hp @ 8100 rpm";
                    configHP[1].textContent = "602 hp @ 8100 rpm";
                    configTorque[0].textContent = "413 lb-ft @ 6700 rpm";
                    configTorque[1].textContent = "413 lb-ft @ 6700 rpm";
                    configSelected.textContent = "Spyder V10 performance quattro";
                    break;
            }
        }

        // event listener that listens for a change in the menu
        configMenu.addEventListener('change', updateConfigTable);
    }

});