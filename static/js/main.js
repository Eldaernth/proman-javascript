// import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";

// This function is to initialize the application
// function init() {
//     // init data
//     dom.init();
//     // loads the boards to the screen
//     dom.loadBoards();

// }


function api_get(url, callback) {
    fetch(url, {
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
        .then(data => callback(data))
}


function createCardEvents() {

    function createCard(event) {
        let cards = document.querySelector(`[data-first-card-id=${CSS.escape(event.target.dataset.buttonId)}]`);
        let cardElement = renderCardElement();
        cards.insertAdjacentHTML("afterbegin", cardElement);
    }

    let newCards = document.querySelectorAll(".new-card");
    for (let newCard of newCards) {
        newCard.onclick = createCard;
    }
}


function initCallback(data) {

    let newBoardButton = document.getElementById("new-board-button");
    newBoardButton.addEventListener("click", () => {
        let modalInput = document.getElementById("board-title");
        modalInput.autofocus = true;
    });

    for (let board of data) {

        let boards = document.getElementById("accordion");
        let boardElement = renderBoardElement(board["title"]);
        boards.insertAdjacentHTML("afterbegin", boardElement);

        createDataAttributes(board);
        createCardEvents();
        dragAndDrop()

    }
}

function init() {
    api_get("/get-boards", initCallback);
}

function createDataAttributes(board) {
    let card = document.querySelector(".new-card");
    card.dataset.buttonId = board["id"];
    card.dataset.buttonTitle = board["title"];

    let newCardPosition = document.querySelector("#new-cards");
    newCardPosition.dataset.firstCardId = board["id"];
    newCardPosition.dataset.firstCardTitle = board["title"];

    let collapseButton = document.querySelector("#collapse-button");
    collapseButton.dataset.target = "#b" + board["id"];
    collapseButton.setAttribute("aria-controls", "b" + board["id"]);

    let collapseDiv = document.querySelector("#collapseTwo");
    collapseDiv.id = "b" + board["id"];
    collapseDiv.setAttribute("aria-labelledby", "b" + board["id"]);
    console.log(collapseButton);
    console.log(collapseDiv);

}


function api_post(url, data, callback) {
    fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => callback(data));
}


function getDataCallback (data) {
    createDataAttributes(data)
}

window.onload = function () {

    dragAndDrop();
    init();
    createBoard();

};

function dragAndDrop() {
    let newCards = document.getElementById('new-cards');
    let inprogress = document.getElementById('in-progress');
    let testing = document.getElementById('testing');
    let done = document.getElementById('done');
    dragula([newCards, inprogress, testing, done]);
}

function createBoard() {
    let newBoard = document.getElementById("create-board");
    newBoard.addEventListener("click", function () {

        let modalHeader = document.getElementById("board-title");
        let boardElement = renderBoardElement(modalHeader.value);
        let boards = document.getElementById("accordion");
        boards.insertAdjacentHTML("afterbegin", boardElement);
        api_post("/add-board", {"title": modalHeader.value}, getDataCallback);
        dragAndDrop()
    });
}


function renderBoardElement(title) {
    return `<div class="card" data-id="" data-title="">
                <div class="card-header" id="headingOne">
                    <tr class="header">
                        <th colspan="4" id="board_header">${title}
                        <button type="button" class="btn btn-light new-card" id="new-card">New Card</button>
                        </th>
                    </tr>
                    <button class="btn btn-link" id="collapse-button" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="false" aria-controls="collapseTwo"> +/- </button>
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
                                <td class="new-cards" id="new-cards"></td>
                                <td class="in-progress" id="in-progress"></td>
                                <td class="testing" id="testing"></td>
                                <td class="done" id="done"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>`;
}

function renderCardElement() {
    return `<div class="card mb-3" style="max-width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">Title</h5>
                <p class="card-text">text</p>
                </div>
            </div>`
}