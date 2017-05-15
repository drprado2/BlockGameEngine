class CanvasManipulator{
    
    public canvas: any;
    public contextCanvas: any;
    public canvasPositionX: number;
    public canvasPositionY: number;
    private scenario: Scenario;

    constructor(scenario: Scenario){
        this.scenario = scenario;
        this.canvas = document.querySelector("#" + this.scenario.getIdCanvas());
        this.contextCanvas = this.canvas.getContext("2d");
        let positionCanvas = this.canvas.getBoundingClientRect();
        this.canvasPositionX = positionCanvas.left;
        this.canvasPositionY = positionCanvas.top;
    }

    clearCanvas(): void{
        this.contextCanvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawObjects(): void{
        this.scenario.drawObjects(this.canvas);
    }
}