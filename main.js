let selectDifficulty;
let selectScenario;
let playerNameInput;
let canvas;
let snakeModule;
let idCanvas;

$(document).ready(function() {
    $(".button-collapse").sideNav();
    $('ul.tabs').tabs();
    $('select').material_select();
    var formPlay = document.querySelector("#form-play");
    selectDifficulty = document.querySelector("#difficulty-select");
    selectScenario = document.querySelector("#scenario-select");
    playerNameInput = document.querySelector("#icon_prefix");
    canvas = document.querySelector("#myCanvas");
    idCanvas = canvas.id;
    score = document.querySelector("#score");
    snakeModule = new SnakeModule(idCanvas, score);
    snakeModule.createScenario(Number.parseInt(selectScenario.value));
    snakeModule.createSnake();
    formPlay.addEventListener("submit", play);
})

function play(event) {
    event.preventDefault();
    debugger;
    snakeModule.createAnimator(Number.parseInt(selectDifficulty.value));
    snakeModule.game.startGame();
}