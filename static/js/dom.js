// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
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
    boardElement: `<table class="table table-bordered">
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
            <td class="new-cards"></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    </table>`,
    init: function () {
        // This function should run once, when the page is loaded.

        // Register event handler for adding new boards
        let button = document.getElementById("new_board");
        // console.log(button);
        const dom = this;
        button.onclick = function () {
            let boards = document.getElementById("boards");
            boards.insertAdjacentHTML("afterbegin", dom.boardElement);
        };
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){
            boardList += `
                <li>${board.title}</li>
            `;
        }

        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;

        this._appendToElement(document.querySelector('#boards'), outerHtml);
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
            dom.showBoards(boards);
        });
    }
    // here comes more features
};
