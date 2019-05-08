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



function addCardCreatePopUpEvent(boardId) {
    let newCard = document.querySelector(`[data-button-id=${CSS.escape(boardId)}]`);
    newCard.onclick = function () {
        let createCard = document.getElementById("create-card");
        createCard.dataset.boardId=boardId;
    }
}

function createCardCallback(data) {
    console.log(data);
    let newStatusCard = document.querySelector(`[data-first-card-id=${CSS.escape(data["board_id"])}]`);
    let cardElement = renderCardElement(data["title"]);
    newStatusCard.insertAdjacentHTML("afterbegin", cardElement);

}


function createCard() {
    let createCard = document.getElementById("create-card");
    createCard.onclick = function (event) {

        let boardId = event.target.dataset.boardId;
        console.log(event.target);

        let cardInput = document.getElementById("card-title");
        let title = cardInput.value;
        let card = {
            "board_id": boardId,
            "title": title,
            "status_id": 0,
            "orders": 0
        };
        api_post("/add-card", card, createCardCallback)

function addCardToBoard(data) {
    console.log("WORK", data);

    for(let card of data) {
        createCardCallback(card);

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

        api_get(`/get-cards/${board["id"]}`, addCardToBoard);

        createDataAttributes(board);
        addCardCreatePopUpEvent(board["id"]);
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

// function newBoardCallback (data) {
//     api_get("/add-board", getDataCallback)
// }

function getDataCallback(data) {
    createDataAttributes(data)
}

window.onload = function () {

    dragAndDrop();
    init();
    createBoard();
    createCard();

};

function dragAndDrop() {
    let newCards = document.getElementById('new-cards');
    let inprogress = document.getElementById('in-progress');
    let testing = document.getElementById('testing');
    let done = document.getElementById('done');
    // let dragDropColumns = [newCards, progress, testing, done];
    // let dragElements = [];
    //
    // for (let columns of dragDropColumns) {
    //     for (let column of columns) {
    //         dragElements.push(column)
    //     }
    // }
    // console.log(dragElements);
    // dragula(dragElements);
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
                        <button type="button" class="btn btn-light new-card" id="new-card" data-toggle="modal" data-target="#cardModalCenter">New Card</button>
                        </th>
                    </tr>
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseTwo"
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

function renderCardElement(title) {
    return `<div class="card mb-3" style="max-width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">text</p>
                </div>
            </div>`
}