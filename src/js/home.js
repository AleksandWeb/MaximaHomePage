import '../templates/general.css';
import '../templates/header/headerStyle.css';
import '../templates/slider/slider.css';
import '../templates/events/eventStyle.css';
import '../templates/calcWeight/calcWeight.css';
import '../templates/walkMan/walkMan.css';
import '../templates/footer/footerStyle.css';


import "../../node_modules/flickity/css/flickity.css";
import "../../node_modules/lhmodal/dist/lhmodal.css";
import '../templates/modalWindows/modalWindows.css';

import $ from "jquery";
import Inputmask from "inputmask";
import Flickity from "flickity";
import Lhmodal from 'lhmodal';


$(document).ready(function() {

    /* <Modal windows > */

    const headerFixedBlock = $('.header-section_fixed').get(0);

    const modal = (modalElementClass, clickElementClass) => {

        const $clickElement = $(clickElementClass);

        const modalWindow = new Lhmodal(modalElementClass, {
            classNames: {
                modalContent: 'modal__content',
                modalClose: 'modal__close',
                bodyWithOpenModal: 'has-open-lhmodal',
            },
            catchFocus: false,
        });

        modalWindow.compensationScrollbarWidth = () => {
            const isHasScrollbar = document.body.scrollHeight > window.innerHeight;
            const scrollbarSize = modalWindow.getScrollbarSize();
            console.log(scrollbarSize);
            if (isHasScrollbar && scrollbarSize) {
                document.documentElement.style.marginRight = `${scrollbarSize}px`;

                headerFixedBlock.style.right = `${scrollbarSize/2}px`;
            }
        };

        modalWindow.handlerClosed = () => {
            const classNames = modalWindow.settings.classNames;
            modalWindow.DOM.modal.dispatchEvent(modalWindow.events.closed);

            modalWindow.DOM.modal.classList.remove(classNames.modalOut);

            document.documentElement.classList.remove(classNames.bodyWithOpenModal);
            document.documentElement.style.marginRight = 0;
            headerFixedBlock.style.right = 0;

        };

        $clickElement.on('click', (e) => {
            e = e || window.event;
            e.preventDefault();
            modalWindow.show();
        });

    };

    modal('.callback-modal', '.header-fixed-button_callback');

    modal('.weight-form-modal', '.weight-form__button');

    /* </Modal windows > */
    //////////////////////////
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
    /////////////////////////////
    /* <Walk-men counter> */

    let now_count_meters = 0,
        now_count_kkal = 0;

    if(localStorage.getItem('now_count_meters')
        && !isNaN(parseInt(localStorage.getItem('now_count_meters')))) {
        now_count_meters =  + localStorage.getItem('now_count_meters');
        now_count_kkal = (now_count_meters * 0.087).toFixed(2)
    }

    const $countMetrs = $('.walk-men__count-metrs'),
        $countKkal = $('.walk-men__count-kkal');

    $countMetrs.text(now_count_meters);
    $countKkal.text(now_count_kkal);
    setInterval(() => {

        let meters = +$countMetrs.text();

        localStorage.setItem('now_count_meters', (meters + 1).toString());

        $countMetrs.text(localStorage.getItem('now_count_meters'));
        $countKkal.text((+$countKkal.text() + 0.087).toFixed(2));

    }, 900);

    /* </Walk-men counter> */
});
