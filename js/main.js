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

    // get img element
    var img = document.querySelector(".customize-img");

    // set default img path variables
    var trim = "cp-";
    var body = "bk-";
    var rims = "bk";

    // set default img path
    var imgDir = "./img/customize/";
    var imgPath = "r8-" + trim + body + rims;

    // function to update customized car image when trim change occurs
    function trimChange(trimChange) {
        trim = trimChange;
        imgPath = "r8-" + trim + body + rims + ".jpg";
        img.setAttribute('src', imgDir + imgPath);
    }

    // function to update customized car image when body color change occurs
    function bodyColorChange(bodyChange) {
        body = bodyChange;
        imgPath = "r8-" + trim + body + rims + ".jpg";
        img.setAttribute('src', imgDir + imgPath);
    }

    // function to update customized car image when rims/wheels change occurs
    function rimsChange(rimsChange) {
        rims = rimsChange;
        imgPath = "r8-" + trim + body + rims + ".jpg";
        img.setAttribute('src', imgDir + imgPath);
    }


    // CAR TRIM
    // get button elements
    var coupeBtn = document.querySelectorAll('.car-trim-btn')[0];
    var spyderBtn = document.querySelectorAll('.car-trim-btn')[1];

    // update custom image when button is clicked
    // coupe btn
    coupeBtn.addEventListener("click", function() {
        trimChange("cp-");
    });

    // spyder btn
    spyderBtn.addEventListener("click", function() {
        trimChange("sp-");
    });


    // CAR BODY COLOR
    // get color square elements
    var bkSq = document.querySelectorAll('.color-option')[0];
    var chSq = document.querySelectorAll('.color-option')[1];
    var slSq = document.querySelectorAll('.color-option')[2];
    var whSq = document.querySelectorAll('.color-option')[3];
    var nvSq = document.querySelectorAll('.color-option')[4];
    var blSq = document.querySelectorAll('.color-option')[5];
    var ywSq = document.querySelectorAll('.color-option')[6];
    var rdSq = document.querySelectorAll('.color-option')[7];

    // update custom image when square is clicked
    // black square
    bkSq.addEventListener("click", function() {
        bodyColorChange("bk-");
    });

    // charcoal square
    chSq.addEventListener("click", function() {
        bodyColorChange("ch-");
    });

    // silver square
    slSq.addEventListener("click", function() {
        bodyColorChange("sl-");
    });

    // white square
    whSq.addEventListener("click", function() {
        bodyColorChange("wh-");
    });

    // navy square
    nvSq.addEventListener("click", function() {
        bodyColorChange("nv-");
    });

    // blue square
    blSq.addEventListener("click", function() {
        bodyColorChange("bl-");
    });

    // yellow square
    ywSq.addEventListener("click", function() {
        bodyColorChange("yw-");
    });

    // red square
    rdSq.addEventListener("click", function() {
        bodyColorChange("rd-");
    });


    // CAR WHEELS/RIMS
    // get square elements
    var bkRimsSq = document.querySelectorAll('.wheel-selector-container img')[0];
    var glRimsSq = document.querySelectorAll('.wheel-selector-container img')[1];

    // update custom image when square is clicked
    // black rims square
    bkRimsSq.addEventListener("click", function() {
        rimsChange("bk");
    });

    // gold rims square
    glRimsSq.addEventListener("click", function() {
        rimsChange("gl");
    });

});