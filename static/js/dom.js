import {dataHandler} from "./data_handler.js";

export let dom = {

    init: {
        init: function () {
            dataHandler.api_get("/get-boards", dom.init.initCallback);
        },
        initCallback: function (data) {

            let newBoardButton = document.getElementById("new-board-button");
            newBoardButton.addEventListener("click", () => {
                let modalInput = document.getElementById("board-title");
                modalInput.autofocus = true;
            });

            for (let board of data) {

                let boards = document.getElementById("accordion");
                let boardElement = dom.render.boardElement(board["title"]);
                boards.insertAdjacentHTML("afterbegin", boardElement);

                dataHandler.api_get(`/get-cards/${board["id"]}`, dom.card.addCardToBoard);

                dom.board.createDataAttributes(board);
                dom.board.collapseHandler(board);
                dom.card.createCardPopUp(board["id"]);
                dom.dragAndDrop.createDndElements()
            }
        }

    },
    board: {
        createBoard: function () {
            let newBoard = document.getElementById("create-board");
            newBoard.addEventListener("click", function () {

                let modalHeader = document.getElementById("board-title");
                let boardElement = dom.render.boardElement(modalHeader.value);
                let boards = document.getElementById("accordion");
                boards.insertAdjacentHTML("afterbegin", boardElement);
                dataHandler.api_post("/add-board", {"title": modalHeader.value}, dom.board.createBoardCallback);
                dom.dragAndDrop.createDndElements()
            });
        },
        createBoardCallback: function (data) {
            dom.board.createDataAttributes(data);
            dom.board.collapseHandler(data);
            dom.card.createCardPopUp(data["id"]);
        },
        createDataAttributes: function createDataAttributes(board) {
            let card = document.querySelector(".new-card");
            card.dataset.buttonId = board["id"];
            card.dataset.buttonTitle = board["title"];

            let newCardPosition = document.querySelector("#new-cards");
            newCardPosition.dataset.firstCardId = board["id"];
            newCardPosition.dataset.firstCardTitle = board["title"];
        },
        collapseHandler: function collapseHandler(board) {
            let collapseButton = document.querySelector("#collapse-button");
            collapseButton.dataset.target = "#b" + board["id"];
            collapseButton.setAttribute("aria-controls", "b" + board["id"]);

            let collapseDiv = document.querySelector("#collapseTwo");
            collapseDiv.id = "b" + board["id"];
            collapseDiv.setAttribute("aria-labelledby", "b" + board["id"]);
        }
    },
    card: {

        createCardPopUp: function (boardId) {
            let newCard = document.querySelector(`[data-button-id=${CSS.escape(boardId)}]`);
            newCard.onclick = function () {
                let createCard = document.getElementById("create-card");
                createCard.dataset.boardId = boardId;
            }
        },

        createCardCallback: function (card) {
            let newStatusCard = document.querySelector(`[data-first-card-id=${CSS.escape(card["board_id"])}]`);
            let cardElement = dom.render.cardElement(card["title"]);
            newStatusCard.insertAdjacentHTML("afterbegin", cardElement);
        },

        onCardClicked: function (event) {
            let boardId = event.target.dataset.boardId;
            let cardInput = document.getElementById("card-title");
            let title = cardInput.value;
            let card = {
                "board_id": boardId,
                "title": title,
                "status_id": 0,
                "orders": 0
            };
            dataHandler.api_post("/add-card", card, this.createCardCallback);
        },

        createCard: function createCard() {
            let createCard = document.getElementById("create-card");
            createCard.addEventListener('click', (e) => this.onCardClicked(e));
        },
        addCardToBoard: function (cards) {
            for (let card of cards) {
                dom.card.createCardCallback(card);
                // THIS ???????????
            }
        }

    },
    dragAndDrop: {
        createDndElements: function () {
            let newCards = document.getElementById('new-cards');
            let inProgress = document.getElementById('in-progress');
            let testing = document.getElementById('testing');
            let done = document.getElementById('done');
            let drake = dragula([newCards, inProgress, testing, done]);
            console.log(drake);
            drake.on("drop", dom.dragAndDrop.onDrop);
        },
        onDrop: function (el, target, source, sibling) {
            console.log("EL",el, "target",target, "SRC",source, "SIB",sibling)
        }
    },
    render: {
        boardElement: function renderBoardElement(title) {
            return `<div class="card" data-id="" data-title="">
                        <div class="card-header" id="headingOne">
                            <tr class="header">
                            <button class="btn btn-link" id="collapse-button" data-toggle="collapse" data-target="#collapseTwo"
                                    aria-expanded="false" aria-controls="collapseTwo"> +/- </button>
                                <th colspan="4" id="board_header">${title}
                                <button type="button"
                                 class="btn btn-light new-card"
                                 id="new-card"
                                 data-toggle="modal"
                                 data-target="#cardModalCenter">New Card</button>
                                </th>
                            </tr>
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
                                        <td class="new-cards" id="new-cards" data-status-id="0"></td>
                                        <td class="in-progress" id="in-progress" data-status-id="1"></td>
                                        <td class="testing" id="testing" data-status-id="2"></td>
                                        <td class="done" id="done" data-status-id="3"></td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>`;
        },
        cardElement: function (title) {
            return `<div class="card mb-3 dnd-card" style="max-width: 18rem;">
                <div class="card-body">
                <h5 class="card-title">${title}</h5>
                </div>
            </div>`
        }
    }

};