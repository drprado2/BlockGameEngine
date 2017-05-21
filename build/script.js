var globalBlockWidth = 10;
var globalBlockHeight = 10;
var globalDistanceMove = 5;
var Directions;
(function (Directions) {
    Directions[Directions["up"] = 1] = "up";
    Directions[Directions["right"] = 2] = "right";
    Directions[Directions["down"] = 3] = "down";
    Directions[Directions["left"] = 4] = "left";
})(Directions || (Directions = {}));
var Keys;
(function (Keys) {
    Keys[Keys["KEY_DOWN"] = 40] = "KEY_DOWN";
    Keys[Keys["KEY_UP"] = 38] = "KEY_UP";
    Keys[Keys["KEY_LEFT"] = 37] = "KEY_LEFT";
    Keys[Keys["KEY_RIGHT"] = 39] = "KEY_RIGHT";
})(Keys || (Keys = {}));
var Rectangle = (function () {
    function Rectangle() {
        this.width = globalBlockWidth;
        this.height = globalBlockHeight;
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
    ObjectDefault.prototype.move = function (direction, distance) {
        if (distance === void 0) { distance = globalDistanceMove; }
        switch (direction) {
            case Directions.up: {
                this.moveUp(distance);
                break;
            }
            case Directions.down: {
                this.moveDown(distance);
                break;
            }
            case Directions.left: {
                this.moveLeft(distance);
                break;
            }
            case Directions.right: {
                this.moveRight(distance);
                break;
            }
        }
    };
    ObjectDefault.prototype.moveUp = function (distance) {
        var lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        var firstBlock = this.bodyBlocks[0];
        var newPositionX = firstBlock.positionX;
        var newPositionY = firstBlock.positionY - distance;
        var blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        var newBlocks = new Array();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    };
    ObjectDefault.prototype.moveRight = function (distance) {
        var lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        var firstBlock = this.bodyBlocks[0];
        var newPositionX = firstBlock.positionX + distance;
        var newPositionY = firstBlock.positionY;
        var blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        var newBlocks = new Array();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    };
    ObjectDefault.prototype.moveDown = function (distance) {
        var lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        var firstBlock = this.bodyBlocks[0];
        var newPositionX = firstBlock.positionX;
        var newPositionY = firstBlock.positionY + distance;
        var blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        var newBlocks = new Array();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    };
    ObjectDefault.prototype.moveLeft = function (distance) {
        var lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        var firstBlock = this.bodyBlocks[0];
        var newPositionX = firstBlock.positionX - distance;
        var newPositionY = firstBlock.positionY;
        var blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        var newBlocks = new Array();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    };
    ObjectDefault.prototype.getBodyBlocks = function () {
        return new Array().concat(this.bodyBlocks);
    };
    ObjectDefault.prototype.draw = function (canvas) {
        this.bodyBlocks.forEach(function (block) { return block.draw(canvas.contextCanvas); });
    };
    ObjectDefault.prototype.refresh = function (canvas) {
        this.draw(canvas);
    };
    ObjectDefault.prototype.selfDestroy = function (canvas) {
        this.bodyBlocks.forEach(function (block) { return block.selfDestroy(canvas.contextCanvas); });
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
var CollisionControl = (function () {
    function CollisionControl() {
    }
    CollisionControl.prototype.willCollide = function (objectsScenario, objectMoved) {
        objectsScenario.forEach(function (objectScenario) {
            objectScenario.getBodyBlocks().forEach(function (blockObjectScenario) {
                objectMoved.getBodyBlocks().forEach(function (blockObjectMoved) {
                    var distanceX = blockObjectMoved.positionX - blockObjectScenario.positionX;
                    distanceX = distanceX >= 0 ? distanceX : distanceX * -1;
                    if (distanceX >= 0 && distanceX < blockObjectMoved.width) {
                        var distanceY = blockObjectMoved.positionY - blockObjectScenario.positionY;
                        distanceY = distanceY >= 0 ? distanceY : distanceY * -1;
                        if (distanceY >= 0 && distanceY < blockObjectMoved.height) {
                            return true;
                        }
                    }
                });
            });
        });
        return false;
    };
    return CollisionControl;
}());
/// <reference path="./../../Globais/Configurations.ts" />
/// <reference path="./../../Globais/Directions.ts" />
/// <reference path="./../../Globais/Keys.ts" />
/// <reference path="../../Interfaces/IMoveAble.ts" />
/// <reference path="./../../Components/Rectangle/Rectangle.ts" />
/// <reference path="./../../Components/ObjectDefault/ObjectDefault.ts" />
/// <reference path="./../Scenario/Scenario.ts" />
/// <reference path="../CanvasManipulator/CanvasManipulator.ts" />
/// <reference path="./../CollisionControl/CollisionControl.ts" />
var MainModule = (function () {
    function MainModule(scenario) {
        this.template = scenario.template;
        this.startTemplate();
        var canvasManipulator = new CanvasManipulator(scenario);
        canvasManipulator.clearCanvas();
        canvasManipulator.drawObjects();
        this.template = scenario.template;
    }
    MainModule.prototype.startTemplate = function () {
        document.querySelector("#mainPlace").innerHTML = this.template;
    };
    return MainModule;
}());
