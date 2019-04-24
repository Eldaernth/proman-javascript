import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

}

init();

let container = document.querySelector("#container");
let container2 = document.querySelector("#container2");
let container3 = document.querySelector("#container3");
let containers = [container, container2, container3];
let drake = dragula({ containers: [container] });
console.log(drake);

dragula([container2]);