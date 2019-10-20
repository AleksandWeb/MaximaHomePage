import $ from "jquery";
import Lhmodal from 'lhmodal';
import "../../node_modules/lhmodal/dist/lhmodal.css";

class MyModal extends Lhmodal {

    constructor(...args) {
        super(...args);
    }
    /**
     * Компенсирует ширину скролла, чтобы устранить "перескоки" ширины содержимого
     * */
    compensationScrollbarWidth () {
        super.compensationScrollbarWidth();
        const scrollbarSize = this.getScrollbarSize();
        $('.header-fixed').get(0).style.right = `${scrollbarSize/2}px`;  //добавил сдвиг фиксированной части header
    }
    /**
     * Удаляет следы открытия модального окна
     * */
    handlerClosed () {
        super.handlerClosed();
        $('.header-fixed').get(0).style.right = 0;            //убрал сдвиг фиксированной части header
    };

    handlerShown() {
        const input = this.DOM.modal.getElementsByTagName('input')[0];
        if (this.settings.catchFocus && input) {
            $(input).trigger('focus');
        }
        this.DOM.modal.dispatchEvent(this.events.shown);
    }

}

export function modalWindow(modalElementClass, clickElementClass) {

    const $clickElement = $("." + clickElementClass);

    const modalWindow = new MyModal("." + modalElementClass, {
        classNames: {
            modalContent: 'modal__content',
            modalClose: 'modal__close',
            bodyWithOpenModal: 'has-open-lhmodal',
        },
    });
    if(typeof(clickElementClass) !== "undefined") {
        $clickElement.on('click', (e) => {
            e.preventDefault();
            modalWindow.show();
        });
    } else {
        modalWindow.show();
    }



}