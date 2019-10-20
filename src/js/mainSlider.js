import Flickity from "flickity";
import "../../node_modules/flickity/css/flickity.css";

import $ from "jquery";

export function myHomeSlider(sliderClass, arrowLeftClass, arrowRightClass) {

        let flkty = new Flickity('.' + sliderClass, {
            wrapAround: true,
            autoPlay: 3000,
            accessibility: true,
            pageDots: false,
            prevNextButtons: false
        });

        const $slider = $('.' + sliderClass);

        $slider.on('click', '.' + arrowLeftClass, function (e){
            e.preventDefault();
            flkty.previous();
        });
        $slider.on('click.slider', '.' + arrowRightClass, function (e){
            e.preventDefault();
            flkty.next();
        });
}
