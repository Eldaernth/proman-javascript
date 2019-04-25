import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

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
    dataHandler._api_post("/add-board", {title: "board"}, function (response) {
        console.log(response)
    });

    let boardElement =
    `<table class="table table-bordered">
        <tr class="header">
            <th colspan="4" id="board_header">
            Board
            <button type="button" class="btn btn-light" id="new_card" >New Card</button>
            <span>-</span>
            </th>
        </tr>
        <tr>
            <th scope="col">New</th>
            <th scope="col">In progress</th>
            <th scope="col">Testing</th>
            <th scope="col">Done</th>
        </tr>
        <tr>
            <td id="new-cards"></td>
            <td></td>
            <td></td>
            <td></td>
                </tr>
    </table>`

    let cardElement = `<div class="card mb-3" style="max-width: 18rem;">
                                    <div class="card-body">
                                    <h5 class="card-title">Title</h5>
                                    <p class="card-text">text</p>
                                    </div>
                                </div>`

    let new_card = document.getElementById("new_card");
    console.log(document.getElementById(    "new-cards"));
    new_card.onclick = function () {
        let cards = document.getElementById("new-cards");
        console.log(cards);
        cards.insertAdjacentHTML("afterbegin", cardElement);
    };
    let button = document.getElementById("new_board");
    console.log(button);
    button.onclick = function () {
        let boards = document.getElementById("boards");
        boards.insertAdjacentHTML("afterbegin", boardElement);
    };

};

