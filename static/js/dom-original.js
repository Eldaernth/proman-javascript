// It uses data_handler-original.js to visualize elements
import { dataHandler } from "./data_handler-original.js";

export let domOriginal = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    cardElement: `<div class="card mb-3" style="max-width: 18rem;">
                    <div class="card-body">
                      <h5 class="card-title">Title</h5>
                      <p class="card-text">text</p>
                    </div>
                  </div>`,
    init: function () {
        // This function should run once, when the page is loaded.

        // Register event handler for adding new boards
        let button = document.getElementById("new_board");
        // console.log(button);
        const dom = this;
        button.onclick = function () {
            dataHandler.createNewBoard("A new board", dom.showBoards);
        };
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(domOriginal.showBoards);
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boards_root = document.getElementById("boards");

        for(let board of boards){
            boards_root.insertAdjacentHTML("afterbegin", domOriginal.renderBoard(board));
            let new_card = document.getElementById(`new_card-${board.id}`);
            new_card.onclick = function () {
                let cards = document.getElementById(`new-cards-${board.id}`);
                cards.insertAdjacentHTML("afterbegin", cardElement);
            };
        }
    },
    renderBoard: function (board) {
        return `<table class="table table-bordered">
        <tr class="header">
            <th colspan="4" id="board_header">
            ${board.name}
            <button type="button" class="btn btn-light" id="new_card-${board.id}" >New Card</button>
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
            <td class="new-cards-${board.id}"></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </table>`;
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    addBoards:function () {
        dataHandler.createNewBoard({title:'Board'},function(boards){
            domOriginal.showBoards(boards);
        });
    }
    // here comes more features
};