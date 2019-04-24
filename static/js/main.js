import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

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

init();
