import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();
    let new_board = document.getElementById("new-board");
    new_board.addEventListener("click",() =>{
        dom.addBoards()
    })


}

init();
