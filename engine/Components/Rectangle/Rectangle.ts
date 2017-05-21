class Rectangle{

    private _positionX: number;
    private _positionY: number;
    private _width: number = globalBlockWidth;
    private _height: number = globalBlockHeight;
    private _itsCollide: boolean;

    constructor(positionX: number, positionY: number, itsCollide: boolean = false){
        this._positionX = positionX;
        this._positionY = positionY;
        this._itsCollide = itsCollide;
    }

    get positionX(): number{
        return this._positionX;
    }

    set positionX(newPosition: number){
        this._positionX = newPosition;
    }

    get positionY(): number{
        return this._positionY;
    }

    set positionY(newPosition: number){
        this._positionY = newPosition;
    }

    get width(): number{
        return this._width;
    }

    get height(): number{
        return this._height;
    }

    get itsCollide(): boolean{
        return this._itsCollide;
    }

    draw(canvas: CanvasManipulator): void{
        canvas.contextCanvas.fillRect(this._positionX, this._positionY, this._width, this._height);
    }

    selfDestroy(canvas: CanvasManipulator): void{
        canvas.contextCanvas.clearRect(this._positionX, this._positionY, this._width, this._height);
    }
}