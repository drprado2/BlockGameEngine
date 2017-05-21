class Rectangle{

    public positionX: number;
    public positionY: number;
    public width: number = globalBlockWidth;
    public height: number = globalBlockHeight;
    public itsCollide: boolean;

    constructor(itsCollide: boolean = false){
        this.itsCollide = itsCollide;
    }

    draw(canvas: CanvasManipulator): void{
        canvas.contextCanvas.fillRect(this.positionX, this.positionY, this.width, this.height);
    }

    selfDestroy(canvas: CanvasManipulator): void{
        canvas.contextCanvas.clearRect(this.positionX, this.positionY, this.width, this.height);
    }
}