document.addEventListener('DOMContentLoaded',(loaded) => {

    /* --------------------------------------- */
    /*   Masthead BG - flicker car lights on   */
    /* --------------------------------------- */

    var mastheadBG = document.querySelector(".masthead-image");

    function lightsON() {
        mastheadBG.classList.add("lights-on");
    }

    function lightsOFF() {
        mastheadBG.classList.remove("lights-on");
    }

    function lightsONfade() {
        mastheadBG.classList.add("lights-on-fade");
    }

    window.setTimeout(lightsON, 300);
    window.setTimeout(lightsOFF, 700);
    window.setTimeout(lightsON, 900);
    window.setTimeout(lightsOFF, 1300);
    window.setTimeout(lightsON, 1350);
    window.setTimeout(lightsOFF, 1600);
    window.setTimeout(lightsONfade, 1800);

    /* --------------------------------------- */
    /*         Set customized car image        */
    /* --------------------------------------- */
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

    // toggle variable for rimsChange function
    var rimsToggle = 0;

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
        for (i = 0; i < allTrimBtns.length; i++) {
            allTrimBtns[i].classList.remove("selected-btn");
        }

        // only select the button that has been clicked on (style wise)
        btn.classList.add("selected-btn");

        trim = trimChange;
        carTrim = trimAlt;
        updateImg();
    }


    // CAR BODY COLOR
    // function to update customized car image when body color change occurs
    function bodyColorChange(bodyChange, bodyAlt, sq) {

        // deselected all squares (style wise)
        for (i = 0; i < allColorSq.length; i++) {
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
        let rgb = colorValue.slice(0, colorValue.length-1);
       // update the bar's color
        bar.style.backgroundImage = "linear-gradient(to right, white," + rgb + ",white)";
    }

    // CAR WHEELS/RIMS
    // function to update customized car image when rims/wheels change occurs
    function rimsChange(rimsChange, rimsAlt, sq) {

        // deselected all squares (style wise)
        // use a toggle variable - for loop was throwing an error
        if (rimsToggle == 0) {
            rimsToggle = 1;
            allRimssq[0].classList.remove("selected");
        }
        else {
            rimsToggle = 0;
            allRimssq[1].classList.remove("selected");

        }

        // only select the square that has been clicked on (style wise)
        sq.classList.add("selected");

        rims = rimsChange;
        rimsColor = rimsAlt;
        updateImg();
    }

    /* ------------------------- */
    /*  4. EventListener (click) */
    /*           functions       */
    /* ------------------------- */

    // CAR TRIM
    // update custom image when button is clicked
    // coupe btn
    coupeBtn.addEventListener("click", function() {
        trimChange("cp-", "coupe", coupeBtn);
    });

    // spyder btn
    spyderBtn.addEventListener("click", function() {
        trimChange("sp-", "spyder", spyderBtn);
    });

    // CAR BODY COLOR
    // update custom image when square is clicked
    // black square
    bkSq.addEventListener("click", function() {
        bodyColorChange("bk-", "black", bkSq);
    });

    // charcoal square
    chSq.addEventListener("click", function() {
        bodyColorChange("ch-", "charcoal", chSq);
    });

    // silver square
    slSq.addEventListener("click", function() {
        bodyColorChange("sl-", "silver", slSq);
    });

    // white square
    whSq.addEventListener("click", function() {
        bodyColorChange("wh-", "white", whSq);
    });

    // navy square
    nvSq.addEventListener("click", function() {
        bodyColorChange("nv-", "navy", nvSq);
    });

    // blue square
    blSq.addEventListener("click", function() {
        bodyColorChange("bl-", "blue", blSq);
    });

    // yellow square
    ywSq.addEventListener("click", function() {
        bodyColorChange("yw-", "yellow", ywSq);
    });

    // red square
    rdSq.addEventListener("click", function() {
        bodyColorChange("rd-", "red", rdSq);
    });


    // CAR WHEELS/RIMS
    // update custom image when square is clicked
    // black rims square
    bkRimsSq.addEventListener("click", function() {
        rimsChange("bk", "black", bkRimsSq);
    });

    // gold rims square
    glRimsSq.addEventListener("click", function() {
        rimsChange("gl", "gold", glRimsSq);
    });

});