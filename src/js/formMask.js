import Inputmask from "inputmask";

export function formMask($form, inputClass, regExp, placeholder = "") {

    const settings = {
            "placeholder": placeholder,
            clearMaskOnLostFocus : false
    };

    const   maskWeight  = new Inputmask(regExp, settings);

    maskWeight.mask($form.find("." + inputClass).get(0));

}
