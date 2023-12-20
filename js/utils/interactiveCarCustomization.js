document.addEventListener("DOMContentLoaded",(loaded) => {

    /* --------------------------------------- */
    /*      SET CUSTOMIZED CAR IMAGE & TEXT    */
    /* --------------------------------------- */

    function interactiveCarCustomization() {


        // check if we are on the home page or product page
        if (document.getElementById("home-page") || document.getElementById("product-page")) {
            /* ------------------------- */
            /*    1. Get DOM elements    */
            /* ------------------------- */

            // Get img element
            let img = document.querySelector(".customize-img");

            // Get gradient bar element
            let bar = document.querySelector(".color-bar");

            // Get button elements
            let allTrimBtns = document.querySelectorAll(".car-trim-btn");
            let coupeBtn = document.querySelectorAll(".car-trim-btn")[0];
            let spyderBtn = document.querySelectorAll(".car-trim-btn")[1];

            // Get color square elements
            let allColorSq = document.querySelectorAll(".color-option-container");
            let bkSq = document.querySelectorAll(".color-option-container")[0];
            let chSq = document.querySelectorAll(".color-option-container")[1];
            let slSq = document.querySelectorAll(".color-option-container")[2];
            let whSq = document.querySelectorAll(".color-option-container")[3];
            let nvSq = document.querySelectorAll(".color-option-container")[4];
            let blSq = document.querySelectorAll(".color-option-container")[5];
            let ywSq = document.querySelectorAll(".color-option-container")[6];
            let rdSq = document.querySelectorAll(".color-option-container")[7];

            // Get rims/wheels square elements
            let allRimssq = document.querySelectorAll(".wheel-selector-container img");
            let bkRimsSq = document.querySelectorAll(".wheel-selector-container img")[0];
            let glRimsSq = document.querySelectorAll(".wheel-selector-container img")[1];

            // Get text elements
            let bodyColorText = document.getElementById("color-choice");
            let rimsColorText = document.getElementById("wheel-choice");
            let priceText = document.getElementById("price");

            /* ------------------------- */
            /*       2. Set vars         */
            /* ------------------------- */

            // Set default img path variables
            let trim = "cp-";
            let body = "bk-";
            let rims = "bk";

            // Set default img path
            let imgDir = "./img/customize/";
            let imgPath = "r8-" + trim + body + rims;

            // Set default alt tag values
            let carTrim = "coupe";
            let carColor = "black";
            let rimsColor = "black";

            /* ------------------------- */
            /*    3. Helper functions    */
            /* ------------------------- */

            // IMAGE
            // Function to update image path and alt tag
            function updateImg() {
                imgPath = "r8-" + trim + body + rims + ".jpg";
                img.setAttribute("src", imgDir + imgPath);
                img.setAttribute("alt", "a " + carColor + " " +
                    "Audi R8 " + carTrim + " with " + rimsColor + " rims ");
            }

            // CAR TRIM
            // Function to update customized car image when trim change occurs
            function trimChange(trimChange, trimAlt, btn) {

                // Deselected all buttons (style wise)
                for (let i = 0; i < allTrimBtns.length; i++) {
                    allTrimBtns[i].classList.remove("selected-btn");
                    allTrimBtns[i].classList.add("unselected-btn");
                }

                // Only select the button that has been clicked on (style wise)
                btn.classList.add("selected-btn");
                btn.classList.remove("unselected-btn");

                trim = trimChange;
                carTrim = trimAlt;
                updateImg();

                // Update price
                // Spyder
                if (btn.innerHTML == "<div>Spyder</div>") {
                    priceText.innerText = "Starting at $171,000"
                }
                // Coupe
                else {
                    priceText.innerText = "Starting at $158,600"
                }
            }

            // CAR BODY COLOR
            // function to update customized car image when body color change occurs
            function bodyColorChange(bodyChange, bodyAlt, sq, colorText) {

                // Deselected all squares (style wise)
                for (let i = 0; i < allColorSq.length; i++) {
                    allColorSq[i].classList.remove("selected");
                }

                // Only select the square that has been clicked on (style wise)
                sq.classList.add("selected");

                body = bodyChange;
                carColor = bodyAlt;
                updateImg();

                // Update the gradient bar color
                // Get color square background value
                let bgColor = sq.childNodes;
                let bgProperty = getComputedStyle(bgColor[0]).getPropertyValue("background-image");

                // Get the color value
                let colorValue = bgProperty.split(" ", 6);
                colorValue = colorValue[3] + colorValue[4] + colorValue[5];
                let rgb = colorValue.slice(0, colorValue.length - 1);

                // Update the bar's color
                bar.style.backgroundImage = "linear-gradient(to right, white," + rgb + ",white)";

                // Update text
                bodyColorText.innerText = colorText;
            }

            // CAR WHEELS/RIMS
            // Function to update customized car image when rims/wheels change occurs
            function rimsChange(rimsChange, rimsAlt, sq, rimsText) {

                // Deselected all squares (style wise)
                allRimssq[0].classList.remove("selected");
                allRimssq[1].classList.remove("selected");

                // Only select the square that has been clicked on (style wise)
                sq.classList.add("selected");

                rims = rimsChange;
                rimsColor = rimsAlt;
                updateImg();

                // Update text
                rimsColorText.innerText = rimsText;
            }

            /* ------------------------- */
            /*  4. EventListener (click) */
            /*           functions       */
            /* ------------------------- */

            // CAR TRIM
            // Update custom image when button is clicked
            // Coupe btn
            coupeBtn.addEventListener("click", function () {
                trimChange("cp-", "coupe", coupeBtn);
            });

            // Spyder btn
            spyderBtn.addEventListener("click", function () {
                trimChange("sp-", "spyder", spyderBtn);
            });

            // CAR BODY COLOR
            // Update custom image when square is clicked
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
            // Update custom image when square is clicked
            // Black rims square
            bkRimsSq.addEventListener("click", function () {
                rimsChange("bk", "black", bkRimsSq, "20\" milled cut design, anthracite black wheels");
            });

            // Gold rims square
            glRimsSq.addEventListener("click", function () {
                rimsChange("gl", "gold", glRimsSq, "20\" 5-V-spoke evo design, matte bronze wheels");
            });
        }
    }

    interactiveCarCustomization();
});
