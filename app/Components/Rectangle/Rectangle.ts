class Rectangle{

    public positionX: number;
    public positionY: number;
    public width: number;
    public height: number;

    draw(canvas: CanvasManipulator): void{
        canvas.contextCanvas.fillRect(this.positionX, this.positionY, this.width, this.height);
    }

    selfDestroy(canvas: CanvasManipulator): void{
        canvas.contextCanvas.clearRect(this.positionX, this.positionY, this.width, this.height);
    }
}