document.addEventListener('DOMContentLoaded',(loaded) => {

    /* --------------------------------------- */
    /*      SET CUSTOMIZED CAR IMAGE & TEXT    */
    /* --------------------------------------- */

    function interactiveCarCustomization() {


        // check if we are on the home page or product page
        if (document.getElementById("home-page") || document.getElementById("product-page")) {
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
                allColorSq[i].addEventListener("click", function () {

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
    }

    interactiveCarCustomization();
});
