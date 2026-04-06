import { inputController } from "./input-controller.js";

document.addEventListener("DOMContentLoaded", init());

function init() {
    const canvas = document.querySelector("#canvas");
    const label = document.querySelector(".controller-state");
    let pressedKey = null;

    canvas.width = 900;
    canvas.height = 600;

    ctx = canvas.getContext("2d");

    testObject = {
        x: 0,
        y: canvas.height - 100,
        width: 40,
        height: 80
    }

    ctx.fillStyle = "black";
    ctx.fillRect(testObject.x, testObject.y, testObject.width, testObject.height);



    document.addEventListener('keydown', (e) => {
        pressedKey = e.key.charCodeAt(0);
    });

}

function createActions() {
    let actions = {
        "left": {
            keys: [97, 65],
            enabled: true
        },

        "right": {
            keys: [55, 2],
            enabled: true
        },

        "jump": {
            keys: [32],
            enabled: true
        }
    }
    return actions;
}