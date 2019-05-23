import {dataHandler} from "./data_handler.js";

export let dom = {

    init: {
        init: function () {
            dataHandler.api_get("/get-boards", dom.init.initCallback);
        },
        initCallback: function (boards) {

            for (let board of boards) {

                let boards = document.getElementById("accordion");
                let boardElement = dom.render.boardElement(board["title"]);
                boards.insertAdjacentHTML("afterbegin", boardElement);

                let newCardButton = document.getElementById("new-card");
                newCardButton.addEventListener("click", function () {
                    document.getElementById("card-title").value = "";
                });

                dataHandler.api_get(`/get-cards/${board["id"]}`, dom.card.addCardToBoard);

                dom.board.createDataAttributes(board);
                dom.board.collapseHandler(board);
                dom.card.createCardPopUp(board["id"]);
                dom.dragAndDrop.createDndElements();
                dom.board.clearCreateBoardInput();
            }
            dom.board.addRenameEvents();
        }
    },
    board: {
        createBoard: function () {
            let newBoard = document.getElementById("create-board");
            newBoard.addEventListener("click", function () {

                let boardTitleInput = document.getElementById("board-title-input");
                let boardElement = dom.render.boardElement(boardTitleInput.value);
                let boards = document.getElementById("accordion");
                boards.insertAdjacentHTML("afterbegin", boardElement);
                let board = document.querySelector(".board-header");
                board.addEventListener("click", dom.board.editBoardTitle);
                dataHandler.api_post("/add-board", {"title": boardTitleInput.value}, dom.board.createBoardCallback);
                dom.dragAndDrop.createDndElements()
            });
        },
        createBoardCallback: function (data) {
            dom.board.createDataAttributes(data);
            dom.board.collapseHandler(data);
            dom.card.createCardPopUp(data["id"]);
        },
        createDataAttributes: function (board) {
            let card = document.querySelector(".new-card");
            card.dataset.boardId = board["id"];
            card.dataset.buttonTitle = board["title"];

            let statuses = ["new-cards", "in-progress", "testing", "done"];
            for (let status of statuses) {
                dom.board.setStatusesDataAttributes(board, `#${status}`);
            }
        },
        setStatusesDataAttributes: function (board, columnIds) {
            let newCardPosition = document.querySelector(columnIds);
            newCardPosition.dataset.boardId = board["id"];
            newCardPosition.dataset.boardTitle = board["title"];

        },
        collapseHandler: function (board) {
            let collapseButton = document.querySelector("#collapse-button");
            collapseButton.dataset.target = "#b" + board["id"];
            collapseButton.setAttribute("aria-controls", "b" + board["id"]);

            let collapseDiv = document.querySelector("#collapseBoard");
            collapseDiv.id = "b" + board["id"];
            collapseDiv.setAttribute("aria-labelledby", "b" + board["id"]);
        },
        clearCreateBoardInput: function () {

            let newBoardButton = document.getElementById("new-board-button");
            newBoardButton.addEventListener("click", function () {
                document.getElementById("board-title-input").value = "";
            });
        },
        addRenameEvents: function () {
            let boards = document.querySelectorAll(".board-header");
            for (let board of boards) {
                board.addEventListener("click", dom.board.editBoardTitle)
            }
        },
        editBoardTitle: function () {
            if (event.target.classList.contains("board-title")) {
                let input = document.createElement("input");
                input.value = event.target.textContent;
                event.currentTarget.replaceChild(input, event.target);
                input.focus();
                input.addEventListener("blur", dom.board.saveBoardTitle)
            }
        },
        saveBoardTitle: function () {
            let span = document.createElement("span");
            let input = document.querySelector("input");
            span.textContent = event.currentTarget.value;

            let title = event.currentTarget.value;
            let id = event.currentTarget.parentNode.querySelector('#new-card').dataset.boardId;
            dataHandler.api_post("/update-board-title", {"title": title, "id": id});
            span.classList.add('board-title');
            input.parentNode.replaceChild(span, input)
        }
    },
    card: {

        createCardPopUp: function (boardId) {
            let newCard = document.querySelector(`[data-board-id=${CSS.escape(boardId)}]`);
            newCard.onclick = function () {
                let createCard = document.getElementById("create-card");
                createCard.dataset.boardId = boardId;
            }
        },

        createCardCallback: function (card) {

            let column = document.querySelector(`[data-status-id="${card["status_id"]}"][data-board-id="${card["board_id"]}"]`);
            let cardElement = dom.render.cardElement(card["title"], card["id"], card["status_id"]);
            column.insertAdjacentHTML("afterbegin", cardElement);


        },

        onNewCardClicked: function (event) {
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

        createCard: function () {
            let createCard = document.getElementById("create-card");
            createCard.addEventListener('click', (e) => this.onNewCardClicked(e));
        },
        addCardToBoard: function (cards) {
            for (let card of cards) {
                dom.card.createCardCallback(card);
            }
        },
        createOrderedCardsObject: function (el) {

            let cardsObject = [];
            let cards = el.parentElement.children;
            for (let i = 0; i < cards.length; i++) {
                let card = {};
                cards[i].dataset.orders = i.toString();
                card["id"] = cards[i].dataset.id;
                card["board_id"] = el.parentElement.dataset.boardId;
                card["status_id"] = cards[i].dataset.statusId;
                card["orders"] = cards[i].dataset.orders;
                cardsObject.push(card);
            }

            return cardsObject
        }

    },
    dragAndDrop: {
        createDndElements: function () {
            let newCards = document.getElementById('new-cards');
            let inProgress = document.getElementById('in-progress');
            let testing = document.getElementById('testing');
            let done = document.getElementById('done');
            let drake = dragula([newCards, inProgress, testing, done]);
            drake.on("drop", dom.dragAndDrop.onDrop);
        },
        onDrop: function (el, target, source, sibling) {
            el.dataset.statusId = target.dataset.statusId;
            dataHandler.api_post("/update-card-status", dom.card.createOrderedCardsObject(el));
        }
    },
    render: {
        boardElement: function (title) {
            return `<div class="board">
                        <div class="board-header">
                            <span class="board-title">${title}</span>
                            <button class="btn btn-link"
                                    id="collapse-button" 
                                    data-toggle="collapse" 
                                    data-target="#collapseBoard"
                                    aria-expanded="false" 
                                    aria-controls="collapseBoard"> +/- </button>
                            <button type="button"
                                    class="btn btn-light new-card"
                                    id="new-card"
                                    data-toggle="modal"
                                    data-target="#cardModalCenter">New Card</button>
                        </div>
                        <div id="collapseBoard" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
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
        cardElement: function (title, id, status_id) {
            return `<div class="card mb-3 dnd-card" 
                         data-id="${id}" 
                         data-status-id="${status_id}">
                        <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        </div>
                    </div>`
        }
    }

};