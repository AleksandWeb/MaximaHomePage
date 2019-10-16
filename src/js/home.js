import '../templates/general.css';
import '../templates/header/headerStyle.css';
import '../templates/slider/slider.css';
import '../templates/events/eventStyle.css';
import '../templates/calcWeight/calcWeight.css';
import '../templates/walkMan/walkMan.css';
import '../templates/footer/footerStyle.css';

import "../../node_modules/flickity/css/flickity.css"

import $ from "jquery";

import Inputmask from "inputmask";

import Flickity from "flickity";

$(document).ready(function() {

    /* <Home page slider> */

    var flkty = new Flickity('.main-slider', {
        wrapAround: true,
        autoPlay: 3000,
        accessibility: true,
        pageDots: false,
        prevNextButtons: false
    });

    const $slider = $('.main-slider');

    $slider.on('click', '.arrow_left', function (e){
        e.preventDefault();
        flkty.previous();
    });
    $slider.on('click.slider', '.arrow_right', function (e){
        e.preventDefault();
        flkty.next();
    });

    /* </Home page slider> */
    ////////////////////////////
    /* <Home page weight-form> */

    const $weightForm = $('#weight-form');

    /* <input masks> */
    const maskOptions = {
        "placeholder": "",
        clearMaskOnLostFocus : false
    };

    const   maskWeight  = new Inputmask("9{1,3} кг", maskOptions),
            maskAge     = new Inputmask("9{1,2} лет", maskOptions),
            maskHeight  = new Inputmask("9{1,3} см", maskOptions);

    maskWeight.mask($weightForm.find(".weight-form__input-weight").get(0));
    maskAge.mask($weightForm.find(".weight-form__input-age").get(0));
    maskHeight.mask($weightForm.find(".weight-form__input-height").get(0));
    /* </input masks> */

    /* <submit form> */
    $weightForm.on('submit', function(e) {

        e = e || window.event;

        e.preventDefault();

        console.log($(this).serializeArray());

    });
    /* </submit form> */

    /* </Home page weight-form> */
});
