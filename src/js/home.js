import '../templates/general.css';
import '../templates/header/headerStyle.css';
import '../templates/events/eventStyle.css';
import '../templates/walkMan/walkMan.css';
import '../templates/footer/footerStyle.css';

import $ from "jquery";

import {modalWindow} from "./modalWindows";
import '../templates/modalWindows/modalWindows.css';

import {myHomeSlider} from "./mainSlider";
import '../templates/slider/slider.css';

import {formMask} from "./formMask";

import {testFirstFocus} from "./weightForm";
import '../templates/calcWeight/calcWeight.css';

import {walkManCounter} from "./walkMen";

$(document).ready(function() {

    /*<Callback form > */

    modalWindow('callback-modal', 'header-fixed__button_callback');

    const $callbackForm = $("#callback-form");

    formMask($callbackForm, "callback-form__input_phone", "+7(999)-999-99-99", "_");

    $callbackForm.on('submit', function(e) {
        e.preventDefault();
        console.log($(this).serializeArray());
    });
    /*</Callback form > */

    //////////////////////////
    /* <Home page slider> */

    myHomeSlider('main-slider__slides', 'main-slider__arrow_left', 'main-slider__arrow_right');

    /* </Home page slider> */
    ////////////////////////////
    /* <Home page weight-form> */

    const $weightForm = $('#weight-form');

    let firstFocus = {
        inputWeight: false,
        inputAge: false,
        inputHeight: false
    };

    firstFocus.inputWeight = testFirstFocus($weightForm.find('.weight-form__input-weight'), firstFocus.inputWeight);
    firstFocus.inputAge = testFirstFocus($weightForm.find('.weight-form__input-age'), firstFocus.inputAge);
    testFirstFocus($weightForm.find('.weight-form__input-height'), firstFocus.inputHeight);

    /* <input masks> */
    formMask($weightForm, "weight-form__input-weight", "9{1,3} кг");
    formMask($weightForm, "weight-form__input-age", "9{1,2} лет");
    formMask($weightForm, "weight-form__input-height", "9{1,3} см");
    /* </input masks> */

    /* <submit form> */
    $weightForm.on('submit', function(e) {
        e.preventDefault();
        console.log($(this).serializeArray());
        modalWindow('weight-form-modal' );
    });
    /* </submit form> */

    /* </Home page weight-form> */
    /////////////////////////////
    /* <Walk-men counter> */

    walkManCounter(900);

    /* </Walk-men counter> */
});
