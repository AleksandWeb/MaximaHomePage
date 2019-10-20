import $ from "jquery";


export function testFirstFocus($input, stateFocus) {
    $input.on('focus', () => {
        if(!stateFocus) {
            $input.val("");
            stateFocus = true;
        }
    });
    return stateFocus
}