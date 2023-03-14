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
