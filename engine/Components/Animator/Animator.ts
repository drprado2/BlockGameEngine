abstract class Animator{

    protected _interval: any;
    protected _miliSecInterval: number;
    protected _animatedObject: ObjectDefault;
    protected _scenario: Scenario;
    protected _collisionControl: CollisionControl;
    protected _game: Game;

    constructor(miliSecInterval: number, animatedObject: ObjectDefault, scenario: Scenario, game: Game){
        this._miliSecInterval = miliSecInterval;
        this._animatedObject = animatedObject;
        this._collisionControl = new CollisionControl();
        this._scenario = scenario;
        this._game = game;
    }

    public abstract startAnimation(): void;
    public abstract stopAnimation(): void;
    protected abstract animate(): void;
}