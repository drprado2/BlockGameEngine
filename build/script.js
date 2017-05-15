var Directoins;
(function (Directoins) {
    Directoins[Directoins["up"] = 1] = "up";
    Directoins[Directoins["right"] = 2] = "right";
    Directoins[Directoins["down"] = 3] = "down";
    Directoins[Directoins["left"] = 4] = "left";
})(Directoins || (Directoins = {}));
var Keys;
(function (Keys) {
    Keys[Keys["KEY_DOWN"] = 40] = "KEY_DOWN";
    Keys[Keys["KEY_UP"] = 38] = "KEY_UP";
    Keys[Keys["KEY_LEFT"] = 37] = "KEY_LEFT";
    Keys[Keys["KEY_RIGHT"] = 39] = "KEY_RIGHT";
})(Keys || (Keys = {}));
var Rectangle = (function () {
    function Rectangle() {
    }
    Rectangle.prototype.draw = function (canvas) {
        canvas.contextCanvas.fillRect(this.positionX, this.positionY, this.width, this.height);
    };
    Rectangle.prototype.selfDestroy = function (canvas) {
        canvas.contextCanvas.clearRect(this.positionX, this.positionY, this.width, this.height);
    };
    return Rectangle;
}());
var ObjectDefault = (function () {
    function ObjectDefault(bodyBlocks) {
        this.bodyBlocks = bodyBlocks;
    }
    ObjectDefault.prototype.draw = function (canvas) {
        this.bodyBlocks.forEach(function (block) { return block.draw(canvas.contextCanvas); });
    };
    ObjectDefault.prototype.refresh = function (canvas) {
        this.draw(canvas);
    };
    ObjectDefault.prototype.selfDestroy = function (canvas) {
        this.bodyBlocks.forEach(function (block) { return block.selfDestroy(canvas.contextCanvas); });
    };
    ObjectDefault.prototype.willCollide = function (targetObject) {
        this.bodyBlocks.forEach(function (block) {
            targetObject.bodyBlocks.forEach(function (blockTarget) {
                var distanceX = block.positionX - blockTarget.positionX;
                distanceX = distanceX >= 0 ? distanceX : distanceX * -1;
                if (distanceX >= 0 && distanceX < blockTarget.width) {
                    var distanceY = block.positionY - blockTarget.positionY;
                    distanceY = distanceY >= 0 ? distanceY : distanceY * -1;
                    if (distanceY >= 0 && distanceY < blockTarget.height) {
                        return true;
                    }
                }
            });
        });
        return false;
    };
    return ObjectDefault;
}());
var Scenario = (function () {
    function Scenario() {
        this.idCanvas = "canvasGame";
        this.initObjects();
        this.startTemplate();
    }
    Scenario.prototype.getIdCanvas = function () {
        return this.idCanvas;
    };
    Scenario.prototype.getObjects = function () {
        var objects = new Array();
        objects = objects.concat(this.objectsToDraw);
        return objects;
    };
    Scenario.prototype.startTemplate = function () {
        this.template = "\n            <canvas id=\"" + this.idCanvas + "\" width=\"" + this.widthCanvas + "\" height=\"" + this.heightCanvas + "\"></canvas>\n        ";
    };
    Scenario.prototype.drawObjects = function (canvas) {
        this.objectsToDraw.forEach(function (obj) { return obj.draw(canvas); });
    };
    Scenario.prototype.refreshObjects = function (canvas) {
        this.objectsToDraw.forEach(function (obj) { return obj.refresh(canvas); });
    };
    Scenario.prototype.destroyAllObjects = function (canvas) {
        this.objectsToDraw.forEach(function (obj) { return obj.selfDestroy(canvas); });
    };
    return Scenario;
}());
var CanvasManipulator = (function () {
    function CanvasManipulator(scenario) {
        this.scenario = scenario;
        this.canvas = document.querySelector("#" + this.scenario.getIdCanvas());
        this.contextCanvas = this.canvas.getContext("2d");
        var positionCanvas = this.canvas.getBoundingClientRect();
        this.canvasPositionX = positionCanvas.left;
        this.canvasPositionY = positionCanvas.top;
    }
    CanvasManipulator.prototype.clearCanvas = function () {
        this.contextCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    CanvasManipulator.prototype.drawObjects = function () {
        this.scenario.drawObjects(this.canvas);
    };
    return CanvasManipulator;
}());
var FrictionControl = (function () {
    function FrictionControl() {
    }
    FrictionControl.prototype.haveFriction = function (objectsScenario, objectMoved) {
        var collide = false;
        objectsScenario.forEach(function (object) {
            collide = object.willCollide(objectMoved);
            if (collide)
                return collide;
        });
        return collide;
    };
    return FrictionControl;
}());
/// <reference path="./../../Globais/Directions.ts" />
/// <reference path="./../../Globais/Keys.ts" />
/// <reference path="../../Interfaces/IMoveAble.ts" />
/// <reference path="./../../Components/Rectangle/Rectangle.ts" />
/// <reference path="./../../Components/ObjectDefault/ObjectDefault.ts" />
/// <reference path="./../Scenario/Scenario.ts" />
/// <reference path="../CanvasManipulator/CanvasManipulator.ts" />
/// <reference path="./../FrictionControl/FrictionControl.ts" />
var Starter = (function () {
    function Starter(scenario) {
        this.template = scenario.template;
        this.startTemplate();
        var canvasManipulator = new CanvasManipulator(scenario);
        canvasManipulator.clearCanvas();
        canvasManipulator.drawObjects();
        this.template = scenario.template;
    }
    Starter.prototype.startTemplate = function () {
        document.querySelector("#mainPlace").innerHTML = this.template;
    };
    return Starter;
}());
