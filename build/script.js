var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DifficultyNivel;
(function (DifficultyNivel) {
    DifficultyNivel[DifficultyNivel["Easy"] = 1] = "Easy";
    DifficultyNivel[DifficultyNivel["Medium"] = 2] = "Medium";
    DifficultyNivel[DifficultyNivel["Hard"] = 3] = "Hard";
})(DifficultyNivel || (DifficultyNivel = {}));
var Scenarios;
(function (Scenarios) {
    Scenarios[Scenarios["ScenarioOutObstacles"] = 1] = "ScenarioOutObstacles";
})(Scenarios || (Scenarios = {}));
var Shared = (function () {
    function Shared() {
    }
    Shared.generateRandomNumber = function (minValue, maxValue) {
        var numero = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
        numero = numero - (numero % 10);
        if (numero < minValue)
            numero = minValue;
        if (numero > maxValue)
            numero = maxValue;
        return numero;
    };
    return Shared;
}());
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
    function Rectangle(positionX, positionY, itsCollide) {
        if (itsCollide === void 0) { itsCollide = false; }
        this._width = globalBlockWidth;
        this._height = globalBlockHeight;
        this._positionX = positionX;
        this._positionY = positionY;
        this._itsCollide = itsCollide;
    }
    Object.defineProperty(Rectangle.prototype, "positionX", {
        get: function () {
            return this._positionX;
        },
        set: function (newPosition) {
            this._positionX = newPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "positionY", {
        get: function () {
            return this._positionY;
        },
        set: function (newPosition) {
            this._positionY = newPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "itsCollide", {
        get: function () {
            return this._itsCollide;
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.draw = function (canvas) {
        canvas.contextCanvas.fillRect(this._positionX, this._positionY, this._width, this._height);
    };
    Rectangle.prototype.selfDestroy = function (canvas) {
        canvas.contextCanvas.clearRect(this._positionX, this._positionY, this._width, this._height);
    };
    return Rectangle;
}());
var ObjectDefault = (function () {
    function ObjectDefault(bodyBlocks) {
        this.bodyBlocks = bodyBlocks;
        this.currentDirection = Directions.right;
    }
    ObjectDefault.prototype.getBodyBlocks = function () {
        return new Array().concat(this.bodyBlocks);
    };
    ObjectDefault.prototype.getOnlyCollideBodyBlocks = function () {
        var collideBlocks = new Array();
        this.bodyBlocks.forEach(function (block) {
            if (block.itsCollide)
                collideBlocks.push(block);
        });
        return collideBlocks;
    };
    ObjectDefault.prototype.draw = function (canvas) {
        this.bodyBlocks.forEach(function (block) { return block.draw(canvas); });
    };
    ObjectDefault.prototype.refresh = function (canvas) {
        this.draw(canvas);
    };
    ObjectDefault.prototype.selfDestroy = function (canvas) {
        this.bodyBlocks.forEach(function (block) { return block.selfDestroy(canvas); });
    };
    return ObjectDefault;
}());
var Scenario = (function () {
    function Scenario() {
        this.initObjects();
    }
    Object.defineProperty(Scenario.prototype, "objectsToDraw", {
        get: function () {
            return this.objectsToDraw;
        },
        enumerable: true,
        configurable: true
    });
    Scenario.prototype.getObjects = function () {
        var objects = new Array();
        objects = objects.concat(this._objectsToDraw);
        return objects;
    };
    Scenario.prototype.drawObjects = function (canvas) {
        if (this._objectsToDraw.length == 0)
            return;
        this._objectsToDraw.forEach(function (obj) { return obj.draw(canvas); });
    };
    Scenario.prototype.refreshObjects = function (canvas) {
        if (this._objectsToDraw.length == 0)
            return;
        this._objectsToDraw.forEach(function (obj) { return obj.refresh(canvas); });
    };
    Scenario.prototype.destroyAllObjects = function (canvas) {
        if (this._objectsToDraw.length == 0)
            return;
        this._objectsToDraw.forEach(function (obj) { return obj.selfDestroy(canvas); });
    };
    return Scenario;
}());
var CanvasManipulator = (function () {
    function CanvasManipulator(idCanvas) {
        this.idCanvas = idCanvas;
        this.canvas = document.querySelector("#" + idCanvas);
        this.contextCanvas = this.canvas.getContext("2d");
        var positionCanvas = this.canvas.getBoundingClientRect();
        this.canvasPositionX = positionCanvas.left;
        this.canvasPositionY = positionCanvas.top;
        this._canvasWidth = this.canvas.width;
        this._canvasHeight = this.canvas.height;
    }
    Object.defineProperty(CanvasManipulator.prototype, "canvasWidth", {
        get: function () {
            return this._canvasWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasManipulator.prototype, "canvasHeight", {
        get: function () {
            return this._canvasHeight;
        },
        enumerable: true,
        configurable: true
    });
    CanvasManipulator.prototype.clearCanvas = function () {
        this.contextCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    CanvasManipulator.prototype.drawObjects = function (scenario) {
        scenario.drawObjects(this.canvas);
    };
    return CanvasManipulator;
}());
var CollisionControl = (function () {
    function CollisionControl() {
    }
    CollisionControl.prototype.willCollide = function (objectsScenario, objectMoved) {
        objectsScenario.forEach(function (objectScenario) {
            objectScenario.getOnlyCollideBodyBlocks().forEach(function (blockObjectScenario) {
                objectMoved.getOnlyCollideBodyBlocks().forEach(function (blockObjectMoved) {
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
    CollisionControl.prototype.blocksWillCollide = function (blockOne, blockTwo) {
        var distanceX = blockOne.positionX - blockTwo.positionX;
        distanceX = distanceX >= 0 ? distanceX : distanceX * -1;
        if (distanceX >= 0 && distanceX < blockOne.width) {
            var distanceY = blockOne.positionY - blockTwo.positionY;
            distanceY = distanceY >= 0 ? distanceY : distanceY * -1;
            if (distanceY >= 0 && distanceY < blockOne.height) {
                return true;
            }
        }
        return false;
    };
    return CollisionControl;
}());
var Animator = (function () {
    function Animator(miliSecInterval, animatedObject, scenario, game) {
        this._miliSecInterval = miliSecInterval;
        this._animatedObject = animatedObject;
        this._collisionControl = new CollisionControl();
        this._scenario = scenario;
        this._game = game;
    }
    return Animator;
}());
var Game = (function () {
    function Game(idCanvas, elementScore) {
        this._idCanvas = idCanvas;
        this._canvasManipulator = new CanvasManipulator(idCanvas);
        this._gameScore = 0;
        this._elementScore = elementScore;
    }
    Object.defineProperty(Game.prototype, "gameScore", {
        get: function () {
            return this._gameScore;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.plusGameScore = function (scoreToAcress) {
        this._gameScore += scoreToAcress;
        this.updateElementGameScore();
    };
    Game.prototype.updateElementGameScore = function () {
        this._elementScore.text = this._gameScore;
    };
    Game.prototype.startGame = function () {
        if (this._selectedScenario == null)
            throw new Error("Por favor selecione um cenário.");
        if (this._animatedObject == null)
            throw new Error("Por favor atualize a página e tente novamente.");
        if (this._animator == null)
            throw new Error("Por favor atualize a página e tente novamente.");
        this._animator.startAnimation();
    };
    Object.defineProperty(Game.prototype, "animator", {
        get: function () {
            return this._animator;
        },
        set: function (animator) {
            this._animator = animator;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.gameOver = function () {
        return;
    };
    Object.defineProperty(Game.prototype, "selectedScenario", {
        set: function (scenario) {
            this._selectedScenario = scenario;
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.startScenario = function () {
        this._selectedScenario.drawObjects(this._canvasManipulator);
    };
    Game.prototype.startAnimatedObject = function () {
        this._animatedObject.draw(this._canvasManipulator);
    };
    Object.defineProperty(Game.prototype, "animatedObject", {
        get: function () {
            return this._animatedObject;
        },
        set: function (object) {
            this._animatedObject = object;
            this.startAnimatedObject();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "canvasManipulator", {
        get: function () {
            return this._canvasManipulator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Game.prototype, "idCanvas", {
        set: function (idCanvas) {
            this._idCanvas = idCanvas;
            this.refreshCanvas();
        },
        enumerable: true,
        configurable: true
    });
    Game.prototype.refreshCanvas = function () {
        this._canvasManipulator = new CanvasManipulator(this.idCanvas);
    };
    return Game;
}());
/// <reference path="./../../Globais/Configurations.ts" />
/// <reference path="./../../Globais/Directions.ts" />
/// <reference path="./../../Globais/Keys.ts" />
/// <reference path="./../../Components/Rectangle/Rectangle.ts" />
/// <reference path="./../../Components/ObjectDefault/ObjectDefault.ts" />
/// <reference path="./../Scenario/Scenario.ts" />
/// <reference path="../CanvasManipulator/CanvasManipulator.ts" />
/// <reference path="./../CollisionControl/CollisionControl.ts" />
/// <reference path="./../Animator/Animator.ts" />
/// <reference path="./../Game/Game.ts" />
var EngineModule = (function () {
    function EngineModule() {
    }
    return EngineModule;
}());
var ScenarioOutObstacles = (function (_super) {
    __extends(ScenarioOutObstacles, _super);
    function ScenarioOutObstacles() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScenarioOutObstacles.prototype.initObjects = function () {
        this._objectsToDraw = new Array();
    };
    return ScenarioOutObstacles;
}(Scenario));
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake() {
        var _this = this;
        var bodyBlocks = new Array();
        bodyBlocks.push(new Rectangle(10, 10, true));
        _this = _super.call(this, bodyBlocks) || this;
        return _this;
    }
    Snake.prototype.updateDirection = function (direction) {
        if (this.canChangeDirection(direction))
            this.currentDirection = direction;
    };
    Snake.prototype.canChangeDirection = function (newDirection) {
        switch (newDirection) {
            case Directions.up: {
                var firstBlock = this.bodyBlocks[0];
                var newPositionX = firstBlock.positionX;
                var newPositionY = firstBlock.positionY - globalDistanceMove;
                if (this.bodyBlocks[1].positionX == newPositionX &&
                    this.bodyBlocks[1].positionY == newPositionY)
                    return false;
                return true;
            }
            case Directions.right: {
                var firstBlock = this.bodyBlocks[0];
                var newPositionX = firstBlock.positionX + globalDistanceMove;
                var newPositionY = firstBlock.positionY;
                if (this.bodyBlocks[1].positionX == newPositionX &&
                    this.bodyBlocks[1].positionY == newPositionY)
                    return false;
            }
            case Directions.down: {
                var firstBlock = this.bodyBlocks[0];
                var newPositionX = firstBlock.positionX;
                var newPositionY = firstBlock.positionY + globalDistanceMove;
                if (this.bodyBlocks[1].positionX == newPositionX &&
                    this.bodyBlocks[1].positionY == newPositionY)
                    return false;
            }
            case Directions.left: {
                var firstBlock = this.bodyBlocks[0];
                var newPositionX = firstBlock.positionX - globalDistanceMove;
                var newPositionY = firstBlock.positionY;
                if (this.bodyBlocks[1].positionX == newPositionX &&
                    this.bodyBlocks[1].positionY == newPositionY)
                    return false;
            }
            default: {
                return true;
            }
        }
    };
    Snake.prototype.move = function () {
        switch (this.currentDirection) {
            case Directions.up: {
                this.moveUp(globalDistanceMove);
                break;
            }
            case Directions.down: {
                this.moveDown(globalDistanceMove);
                break;
            }
            case Directions.left: {
                this.moveLeft(globalDistanceMove);
                break;
            }
            case Directions.right: {
                this.moveRight(globalDistanceMove);
                break;
            }
        }
    };
    Snake.prototype.moveUp = function (distance) {
        var lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        var firstBlock = this.bodyBlocks[0];
        var newPositionX = firstBlock.positionX;
        var newPositionY = firstBlock.positionY - distance;
        var blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        var newBlocks = new Array();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    };
    Snake.prototype.moveRight = function (distance) {
        var lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        var firstBlock = this.bodyBlocks[0];
        var newPositionX = firstBlock.positionX + distance;
        var newPositionY = firstBlock.positionY;
        var blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        var newBlocks = new Array();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    };
    Snake.prototype.moveDown = function (distance) {
        var lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        var firstBlock = this.bodyBlocks[0];
        var newPositionX = firstBlock.positionX;
        var newPositionY = firstBlock.positionY + distance;
        var blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        var newBlocks = new Array();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    };
    Snake.prototype.moveLeft = function (distance) {
        var lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        var firstBlock = this.bodyBlocks[0];
        var newPositionX = firstBlock.positionX - distance;
        var newPositionY = firstBlock.positionY;
        var blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        var newBlocks = new Array();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    };
    return Snake;
}(ObjectDefault));
var SnakeEat = (function (_super) {
    __extends(SnakeEat, _super);
    function SnakeEat(widthCanvas, heightCanvas) {
        var _this = this;
        var randomX = Shared.generateRandomNumber(0, widthCanvas - globalBlockWidth);
        var randomY = Shared.generateRandomNumber(0, heightCanvas - globalBlockHeight);
        var eatBlock = new Rectangle(randomX, randomY, true);
        var eatBlocks = new Array();
        eatBlocks.push(eatBlock);
        _this = _super.call(this, eatBlocks) || this;
        return _this;
    }
    SnakeEat.prototype.updateDirection = function (direction) {
        return;
    };
    SnakeEat.prototype.move = function () {
        return;
    };
    return SnakeEat;
}(ObjectDefault));
var SnakeAnimator = (function (_super) {
    __extends(SnakeAnimator, _super);
    function SnakeAnimator(miliSecInterval, animatedObject, scenario, game) {
        return _super.call(this, miliSecInterval, animatedObject, scenario, game) || this;
    }
    SnakeAnimator.prototype.startAnimation = function () {
        this._snakeEat = new SnakeEat(this._game.canvasManipulator.canvasWidth, this._game.canvasManipulator.canvasHeight);
        this._snakeEat.draw(this._game.canvasManipulator);
        this._interval = window.setInterval(this.animate.bind(this), this._miliSecInterval);
    };
    SnakeAnimator.prototype.stopAnimation = function () {
        window.clearInterval(this._interval);
    };
    SnakeAnimator.prototype.animate = function () {
        this._animatedObject.selfDestroy(this._game.canvasManipulator);
        this._animatedObject.move();
        if (this._collisionControl.willCollide(this._scenario.objectsToDraw, this._animatedObject)) {
            this.stopAnimation();
            this._game.gameOver();
        }
        this._animatedObject.draw(this._game.canvasManipulator);
        if (this.snakeEatFood) {
            this._game.plusGameScore(1);
            this._snakeEat.selfDestroy;
            this._snakeEat = new SnakeEat(this._game.canvasManipulator.canvasWidth, this._game.canvasManipulator.canvasHeight);
            this._snakeEat.draw(this._game.canvasManipulator);
        }
    };
    SnakeAnimator.prototype.snakeEatFood = function (snakeHead) {
        if (this._collisionControl.blocksWillCollide(snakeHead, this._snakeEat.getBodyBlocks[0])) {
            return true;
        }
        return false;
    };
    return SnakeAnimator;
}(Animator));
/// <reference path="./../../Enums/DifficultyNivel.ts" />
/// <reference path="./../../Enums/Scenarios.ts" />
/// <reference path="./../../Shared/Shared.ts" />
/// <reference path="./../../../engine/Components/EngineModule/EngineModule.ts" />
/// <reference path="./../ScenarioOutObstacles/ScenarioOutObstacles.ts" />
/// <reference path="./../Snake/Snake.ts" />
/// <reference path="./../SnakeEat/SnakeEat.ts" />
/// <reference path="./../SnakeAnimator/SnakeAnimator.ts" />
var SnakeModule = (function () {
    function SnakeModule(idCanvas, scoreElement) {
        this._game = new Game(idCanvas, scoreElement);
    }
    SnakeModule.prototype.createScenario = function (scenario) {
        switch (scenario) {
            case Scenarios.ScenarioOutObstacles: {
                this._game.selectedScenario = new ScenarioOutObstacles();
                this._game.startScenario();
                break;
            }
        }
    };
    SnakeModule.prototype.createSnake = function () {
        this._game.animatedObject = new Snake();
    };
    Object.defineProperty(SnakeModule.prototype, "game", {
        get: function () {
            return this._game;
        },
        enumerable: true,
        configurable: true
    });
    SnakeModule.prototype.createAnimator = function (selectedDifficulty) {
        switch (selectedDifficulty) {
            case DifficultyNivel.Easy: {
                this._game.animator = new SnakeAnimator(1000, this._game.animatedObject, this._game.selectedScenario, this._game);
                break;
            }
            case DifficultyNivel.Medium: {
                this._game.animator = new SnakeAnimator(750, this._game.animatedObject, this._game.selectedScenario, this._game);
                break;
            }
            case DifficultyNivel.Hard: {
                this._game.animator = new SnakeAnimator(500, this._game.animatedObject, this._game.selectedScenario, this._game);
                break;
            }
        }
    };
    return SnakeModule;
}());
