class SnakeAnimator extends Animator{

    private _snakeEat: SnakeEat;

    constructor(miliSecInterval: number, animatedObject: ObjectDefault, scenario: Scenario, game: Game){
        super(miliSecInterval, animatedObject, scenario, game);
    }

    public startAnimation(): void{
        this._snakeEat = new SnakeEat(this._game.canvasManipulator.canvasWidth, this._game.canvasManipulator.canvasHeight);
        this._snakeEat.draw(this._game.canvasManipulator);
        this._interval = window.setInterval(this.animate.bind(this), this._miliSecInterval);
    }  

    public stopAnimation(): void{
        window.clearInterval(this._interval);
    }

    protected animate(): void{
        this._animatedObject.selfDestroy(this._game.canvasManipulator);
        this._animatedObject.move();
        if(this._collisionControl.willCollide(this._scenario.objectsToDraw, this._animatedObject)){
            this.stopAnimation();
            this._game.gameOver();
        }
        this._animatedObject.draw(this._game.canvasManipulator);
        if(this.snakeEatFood){
            this._game.plusGameScore(1);
            this._snakeEat.selfDestroy;
            this._snakeEat = new SnakeEat(this._game.canvasManipulator.canvasWidth, this._game.canvasManipulator.canvasHeight);
            this._snakeEat.draw(this._game.canvasManipulator);
        }

    }

    snakeEatFood(snakeHead: Rectangle) {
        if (this._collisionControl.blocksWillCollide(snakeHead, this._snakeEat.getBodyBlocks[0])) {
            return true;
        }
        return false;
    }
}