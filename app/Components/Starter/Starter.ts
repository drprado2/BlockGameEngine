/// <reference path="./../../Globais/Directions.ts" />
/// <reference path="./../../Globais/Keys.ts" />
/// <reference path="../../Interfaces/IMoveAble.ts" />
/// <reference path="./../../Components/Rectangle/Rectangle.ts" />
/// <reference path="./../../Components/ObjectDefault/ObjectDefault.ts" />
/// <reference path="./../Scenario/Scenario.ts" />
/// <reference path="../CanvasManipulator/CanvasManipulator.ts" />
/// <reference path="./../FrictionControl/FrictionControl.ts" />

class Starter {
    template: string;

    constructor(scenario: Scenario){        
        this.template = scenario.template;
        this.startTemplate();
        let canvasManipulator = new CanvasManipulator(scenario);
        canvasManipulator.clearCanvas();
        canvasManipulator.drawObjects();
        this.template = scenario.template;
    }

    startTemplate(): void{
        document.querySelector("#mainPlace").innerHTML = this.template;
    }
}