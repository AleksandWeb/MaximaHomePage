import $ from "jquery";

export function walkManCounter(timeOut) {

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

    }, timeOut);

}
