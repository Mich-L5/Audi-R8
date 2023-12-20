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
    /*      SET CUSTOMIZED CAR IMAGE & TEXT    */
    /* --------------------------------------- */

    // check if we are on the home page or product page
    if (document.getElementById("home-page") || document.getElementById("product-page"))
    {
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
        // Create a CarColor class
        class CarColor {
            constructor(colorCode, colorName, fullColorName) {
                this.colorCode = colorCode;
                this.colorName = colorName;
                this.fullColorName = fullColorName;
            }
        }

        // Declare the CarColor objects
        let bk = new CarColor("bk-", "black", "Mythos Black Metallic");
        let ch = new CarColor("ch-", "charcoal", "Mythos Black Metallic");
        let sl = new CarColor("sl-", "silver", "Mythos Black Metallic");
        let wh = new CarColor("wh-", "white", "Mythos Black Metallic");
        let nv = new CarColor("nv-", "navy", "Mythos Black Metallic");
        let bl = new CarColor("bl-", "blue", "Mythos Black Metallic");
        let yw = new CarColor("yw-", "yellow", "Mythos Black Metallic");
        let rd = new CarColor("rd-", "red", "Mythos Black Metallic");

        let allColorsOrdered = [bk, ch, sl, wh, nv, bl, yw, rd];

        // Add an event listener to each color square, and invoke the bodyColorChange function when a square is clicked
        for (let i = 0; i < allColorSq.length; i++) {
            allColorSq[i].addEventListener("click", function() {

                let currentColor = allColorsOrdered[i];
                bodyColorChange(currentColor["colorCode"], currentColor["colorName"], allColorSq[i], currentColor["fullColorName"]);
            });
        }

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
    /*    CAR CONFIGURATION DROP DOWN MENU     */
    /* --------------------------------------- */

    if (document.getElementById("product-page"))
    {

        // get the selected configuration name
        var configSelected = document.getElementById("config-selected");

        // get the dropdown menu and its value
        var configMenu = document.getElementById("config-menu");
        var configMenuValue = document.getElementById("config-menu").value;

        // get the table value elements (desktop and mobile tables)
        var configPrice = document.querySelectorAll(".config-price");
        var configEngine = document.querySelectorAll(".config-engine");
        var configTransmission = document.querySelectorAll(".config-transmission");
        var configDrivetrain = document.querySelectorAll(".config-drivetrain");
        var configFuel = document.querySelectorAll(".config-fuel");
        var configHP = document.querySelectorAll(".config-hp");
        var configTorque = document.querySelectorAll(".config-torque");

        // Create a CarTrim class
        class CarTrim {
            constructor(name, price, engine, transmission, driveTrain, fuelCity, fuelHwy, hp, torque) {
                this.name = name;
                this.price = price;
                this.engine = engine;
                this.transmission = transmission;
                this.driveTrain = driveTrain;
                this.fuelCity = fuelCity;
                this.fuelHwy = fuelHwy;
                this.hp = hp;
                this.torque = torque;
            }
        }

        // Declare the CarTrim objects
        let coupeV10RWD = new CarTrim("Coupe V10 Performance RWD", "$158,600", "5.2L V10 Gas", "7-Speed Automatic", "Rear-Wheel Drive", "14", "23", "562 HP @ 4475 RPM", "406 lb-ft @ 6300 RPM");
        let coupeV10quattro = new CarTrim("Coupe V10 Performance Quattro", "$209,700", "5.2L V10 Gas", "7-Speed Automatic", "All-Wheel Drive", "13", "18", "602 HP @ 8100 RPM", "413 lb-ft @ 6700 RPM");
        let coupeGTRWD = new CarTrim("Coupe GT RWD", "$249,900", "5.2L V10 Gas", "7-Speed Automatic", "Rear-Wheel Drive", "14", "21", "602 HP @ 8100 RPM", "413 lb-ft @ 6700 RPM");
        let spyderV10RWD = new CarTrim("Spyder V10 Performance RWD", "$171,000", "5.2L V10 Gas", "7-Speed Automatic", "Rear-Wheel Drive", "14", "23", "562 HP @ 4475 RPM", "406 lb-ft @ 6300 RPM");
        let spyderV10Quattro = new CarTrim("Spyder V10 Performance Quattro", "$222,100", "5.2L V10 Gas", "7-Speed Automatic", "All-Wheel Drive", "13", "18", "602 HP @ 8100 RPM", "413 lb-ft @ 6700 RPM");

        // Function to update the values in the config table
        function updateTableData(carTrim) {
            configPrice[0].textContent = carTrim["price"];
            configPrice[1].textContent = carTrim["price"];
            configEngine[0].textContent = carTrim["engine"];
            configEngine[1].textContent = carTrim["engine"];
            configTransmission[0].textContent = carTrim["transmission"];
            configTransmission[1].textContent = carTrim["transmission"];
            configDrivetrain[0].textContent = carTrim["driveTrain"];
            configDrivetrain[1].textContent = carTrim["driveTrain"];
            configFuel[0].innerHTML = "City: " + carTrim["fuelCity"] + " MPG\n" +
                "                    <span>Hwy: " + carTrim["fuelHwy"] + " MPG</span>";
            configFuel[1].innerHTML = "City: " + carTrim["fuelCity"] + " MPG\n" +
                "                    <span>Hwy: " + carTrim["fuelHwy"] + " MPG</span>";
            configHP[0].textContent = carTrim["hp"];
            configHP[1].textContent = carTrim["hp"];
            configTorque[0].textContent = carTrim["torque"];
            configTorque[1].textContent = carTrim["torque"];
            configSelected.textContent = carTrim["name"];
        }

        // function to update the configuration table based on which value is selected from dropdown menu
        function updateConfigTable() {
            configMenuValue = document.getElementById("config-menu").value;

            // switch statement to display table values based on option selected
            switch(configMenuValue) {
                case "1":
                    updateTableData(coupeV10RWD);
                    break;
                case "2":
                    updateTableData(coupeV10quattro);
                    break;
                case "3":
                    updateTableData(coupeGTRWD);
                    break;
                case "4":
                    updateTableData(spyderV10RWD);
                    break;
                case "5":
                    updateTableData(spyderV10Quattro);
                    break;
            }
        }

        // event listener that listens for a change in the menu
        configMenu.addEventListener('change', updateConfigTable);
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