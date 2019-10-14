import '../templates/general.css';
import '../templates/header/headerStyle.css';

import '../templates/events/eventsStyle.css';
import '../templates/footer/footerStyle.css';
import '../templates/slider/slider.css';

import "../../node_modules/flickity/css/flickity.css"

import $ from "jquery";

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

    console.log(flkty);

    /* </Home page slider> */
});
