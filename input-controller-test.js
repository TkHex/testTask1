import { controller } from "./input-controller.js";

let getterList = null;
let getterActive = null;
let getterState = null;
let canvas = null;
let ctx = null;
let something = null;
let controllersList = null;
let controllersActive = null;
let controllerState = null;
let counter = 0;

const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 900;


document.addEventListener("DOMContentLoaded", init());

function init() {
    controllersList = document.querySelector(".controller-list");
    controllersActive = document.querySelector(".controller-active");
    controllerState = document.querySelector(".controller-state");
    const kbOn = document.querySelector(".kbOn");
    const kbOff = document.querySelector(".kbOff");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    controller.addDevice('keyboard');

    kbOn.addEventListener('click', (e) => {
        controller.enableDevice('keyboard');
        getterActive = controller.getActiveDevices();
        getterActive.forEach(devAcive => {
            controllersActive.textContent = devAcive;
        });
    });

    kbOff.addEventListener('click', (e) => {
        controller.disableDevice('keyboard');
    });

    something = {
        x: 10,
        y: CANVAS_HEIGHT / 2 - 80,
        width: 30,
        height: 80
    };

    getterList = controller.getDevices();
    for (const key of getterList.keys()) {
        controllersList.textContent += key;
    }
    
    canvasloop();
}

function canvasloop() {
    updateCanvas();
    drawCanvas();

    requestAnimationFrame(canvasloop);
}

function updateCanvas() {

    if (controller.ACTION_LEFT) {
        something.x = something.x - 10;
    }

    if (controller.ACTION_RIGHT) {
        something.x = something.x + 10;
    }

    if (controller.ACTION_SPACE) {
        if (counter === 0) {
            something.y = something.y - 30;
            counter = 1;

            setTimeout(() => {
                something.y = something.y + 30;
                counter = 0;
            }, 500);
        }
    }

    if (something.x < 10) {
        something.x = 10;
    }

    if (something.x > CANVAS_WIDTH - 40) {
        something.x = CANVAS_WIDTH - 40;
    }

    if (controller.ACTION_LEFT) {
        controllerState.textContent = "ACTION_LEFT";
    } else if (controller.ACTION_RIGHT) {
        controllerState.textContent = "ACTION_RIGHT";
    } else {
        controllerState.textContent = "Ничего не нажато";
    }

}

function drawCanvas() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "grey";
    ctx.fillRect(something.x, something.y, something.width, something.height);
}