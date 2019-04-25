import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";

// This function is to initialize the application
function init() {
    init_data();
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

}

function init_data() {
    dataHandler._api_post("/add-board", {title: "board"}, function (response) {
        console.log(response)
    });
}

//
// $('.header').click(function(){
//
// $(this).nextUntil('tr.header').slideToggle(1000);
// });

$('.header').click(function () {
    $(this).find('span').text(function (_, value) {
        return value === '-' ? '+' : '-'
    });
    $(this).nextUntil('tr.header').slideToggle(100, function () {
    });
});


window.onload = function () {
    init();

    /// TODO: class instead of ID
    let new_card = document.getElementById("new_card");
    // console.log(document.getElementById(    "new-cards"));
    new_card.onclick = function () {
        let cards = document.getElementById("new-cards");
        console.log(cards);
        cards.insertAdjacentHTML("afterbegin", cardElement);
    };

};
