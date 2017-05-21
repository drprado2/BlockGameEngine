class Game{
    private _selectedScenario: Scenario;
    private _canvasManipulator: CanvasManipulator;
    private _idCanvas: string;
    private _animatedObject: ObjectDefault;
    private _animator: Animator;
    private _gameScore: number;

    constructor(idCanvas: string){
        this._idCanvas = idCanvas;
        this._canvasManipulator = new CanvasManipulator(idCanvas);
        this._gameScore = 0;
    }

    get gameScore(): number{
        return this._gameScore;
    }

    public plusGameScore(scoreToAcress: number){
        this._gameScore += scoreToAcress;
    }

    public startGame(){
        if(this._selectedScenario == null)
            throw new Error("Por favor selecione um cenário.");
        if(this._animatedObject == null)
            throw new Error("Por favor atualize a página e tente novamente.");
        if(this._animator == null)
            throw new Error("Por favor atualize a página e tente novamente.");
        this._animator.startAnimation();        
    }

    set animator(animator){
        this._animator = animator;
    }

    public gameOver(){

    }

    get animator(): Animator{
        return this._animator;
    }

    set selectedScenario(scenario: Scenario){
        this._selectedScenario = scenario;
    }

    public startScenario(){
        if(this._selectedScenario == null)
            throw new Error("Ainda não foi selecionado nenhum cenário.");
        this._selectedScenario.drawObjects(this._canvasManipulator);    
    }

    private startAnimatedObject(){
        this._animatedObject.draw(this._canvasManipulator);
    }

    set animatedObject(object: ObjectDefault){
        this._animatedObject = object;
        this.startAnimatedObject();
    }

    get animatedObject(): ObjectDefault{
        return this._animatedObject;
    }

    get canvasManipulator(): CanvasManipulator{
        return this._canvasManipulator;
    }

    set idCanvas(idCanvas: string){
        this._idCanvas = idCanvas;
        this.refreshCanvas();
    }

    private refreshCanvas(){
        this._canvasManipulator = new CanvasManipulator(this.idCanvas);
    }
}