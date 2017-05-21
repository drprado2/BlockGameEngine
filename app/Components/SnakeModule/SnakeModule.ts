/// <reference path="./../../Enums/DifficultyNivel.ts" />
/// <reference path="./../../Enums/Scenarios.ts" />
/// <reference path="./../../Shared/Shared.ts" />
/// <reference path="./../../../engine/Components/EngineModule/EngineModule.ts" />
/// <reference path="./../ScenarioOutObstacles/ScenarioOutObstacles.ts" />
/// <reference path="./../Snake/Snake.ts" />
/// <reference path="./../SnakeEat/SnakeEat.ts" />
/// <reference path="./../SnakeAnimator/SnakeAnimator.ts" />

class SnakeModule{
    private _game: Game;

    constructor(idCanvas: string){
        this._game = new Game(idCanvas);
    }

    public createScenario(scenario: Scenarios){
        switch(scenario){
            case Scenarios.ScenarioOutObstacles: {
                this._game.selectedScenario = new ScenarioOutObstacles();
                break;
            }
        }
    }

    public createSnake(){
        this._game.animatedObject = new Snake;
    }

    get game(): Game{
        return this._game;
    }

    createAnimator(selectedDifficulty: DifficultyNivel){
        switch(selectedDifficulty){
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
    }
}