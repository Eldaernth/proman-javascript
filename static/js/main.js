// import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";

// This function is to initialize the application
// function init() {
//     // init data
//     dom.init();
//     // loads the boards to the screen
//     dom.loadBoards();

// }

//
// $('.header').click(function(){
//
// $(this).nextUntil('tr.header').slideToggle(1000);
// });

// $('.header').click(function () {
//     $(this).find('span').text(function (_, value) {
//         return value === '-' ? '+' : '-'
//     });
//     $(this).nextUntil('tr.header').slideToggle(100, function () {
//     });
// });


function init() {
    fetch("/get-boards", {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            for (let board of data) {
                let boardElement = renderBoard(board["title"]);
                let boards = document.getElementById("accordion");
                boards.insertAdjacentHTML("afterbegin", boardElement);
            }
        });
}

window.onload = function () {
    init();

    let cardElement = `<div class="card mb-3" style="max-width: 18rem;">
                                    <div class="card-body">
                                    <h5 class="card-title">Title</h5>
                                    <p class="card-text">text</p>
                                    </div>
                                </div>`;

    let new_card = document.getElementById("new-card");
    console.log(document.getElementById("new-cards"));
    new_card.onclick = function () {
        let cards = document.getElementById("new-cards");
        console.log(cards);
        cards.insertAdjacentHTML("afterbegin", cardElement);
    };


    // button.onclick = function () {
    //     let boards = document.getElementById("accordion");
    //     boards.insertAdjacentHTML("afterbegin", boardElement);
    // };
    //

    dragula([document.getElementById('new-cards'), document.getElementById('progress'),
        document.getElementById('testing'), document.getElementById('done')])


    let newBoard = document.getElementById("create-board");
    newBoard.addEventListener("click", function () {
        let title = document.getElementById("board-title");

        let boardElement = renderBoard(title.value);

        let boards = document.getElementById("accordion");
        boards.insertAdjacentHTML("afterbegin", boardElement);

        console.log("OK");
        fetch("/add-board", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrer: "no-referrer",
            body: JSON.stringify({
                "title": title.value
            }),
        })
            .then(response => response.json())
            .then(data => console.log(data));

    })
};

function renderBoard(title) {
    return `<div class="card">
                <div class="card-header" id="headingOne">
                    <tr class="header">
                        <th colspan="4" id="board_header">
                            ${title}
                            <button type="button" class="btn btn-light new_card" id="new_card">New Card</button>
                        </th>
                    </tr>
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="false" aria-controls="collapseTwo">
                        +/-
                    </button>
                </div>

                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="card-body">
                        <table class="table table-bordered">
                            <tr>
                                <th scope="col">New</th>
                                <th scope="col">In progress</th>
                                <th scope="col">Testing</th>
                                <th scope="col">Done</th>
                            </tr>
                            <tr id="columns">
                                <td id="new-cards">
                                    <!--<div class="card mb-3" id="card" style="max-width: 18rem;">-->
                                        <!--<div class="card-body">-->
                                            <!--<h5 class="card-title">Title 1</h5>-->
                                            <!--<p class="card-text">text</p>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="card mb-3" id="card" style="max-width: 18rem;">-->
                                        <!--<div class="card-body">-->
                                            <!--<h5 class="card-title">Title 2</h5>-->
                                            <!--<p class="card-text">text</p>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                </td>
                                <td id="progress">

                                </td>
                                <td id="testing"></td>
                                <td id="done"></td>
                            </tr>
                        </table>

                    </div>
                </div>
            </div>`;
}

