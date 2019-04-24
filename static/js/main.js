import { dom } from "./dom.js";
import {dataHandler} from "./data_handler";

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
//
// $('.header').click(function(){
//
// $(this).nextUntil('tr.header').slideToggle(1000);
// });

$('.header').click(function(){
   $(this).find('span').text(function(_, value){return value=='-'?'+':'-'});
    $(this).nextUntil('tr.header').slideToggle(100, function(){
    });
});
window.onload = function () {
    init();
    dataHandler._api_post("/add-board",{title:"board"},function (response) {
        console.log(response)

    })
};

