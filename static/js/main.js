import {dom} from "./dom.js";
import {dataHandler} from "./data_handler.js";

// This function is to initialize the application
// function init() {
//     // init data
//     domOriginal.init();
//     // loads the boards to the screen
//     domOriginal.loadBoards();

// }











function addCardToBoard(data) {
    for (let card of data) {
        dom.card.createCardCallback(card);
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

        dataHandler.api_get(`/get-cards/${board["id"]}`, addCardToBoard);

        createDataAttributes(board);
        dom.card.createCardPopUp(board["id"]);
        dragAndDrop()
    }
}


function init() {
    dataHandler.api_get("/get-boards", initCallback);
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


}




function getDataCallback(data) {
    createDataAttributes(data);
    dom.card.createCardPopUp(data["id"]);
}

window.onload = function () {

    dragAndDrop();
    init();
    createBoard();
    dom.card.createCard();

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
        dataHandler.api_post("/add-board", {"title": modalHeader.value}, getDataCallback);
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

