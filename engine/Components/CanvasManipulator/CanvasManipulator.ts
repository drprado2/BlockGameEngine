class CanvasManipulator{
    
    public canvas: any;
    public contextCanvas: any;
    public canvasPositionX: number;
    public canvasPositionY: number;
    private _canvasWidth: number;
    private _canvasHeight: number;
    private idCanvas: string;

    constructor(idCanvas: string){
        this.idCanvas = idCanvas;
        this.canvas = document.querySelector("#" + idCanvas);
        this.contextCanvas = this.canvas.getContext("2d");
        let positionCanvas = this.canvas.getBoundingClientRect();
        this.canvasPositionX = positionCanvas.left;
        this.canvasPositionY = positionCanvas.top;
        this._canvasWidth = this.canvas.width;
        this._canvasHeight = this.canvas.height;
    }

    get canvasWidth(): number{
        return this._canvasWidth
    }

    get canvasHeight(): number{
        return this._canvasHeight
    }

    clearCanvas(): void{
        this.contextCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawObjects(scenario: Scenario): void{
        scenario.drawObjects(this.canvas);
    }
}