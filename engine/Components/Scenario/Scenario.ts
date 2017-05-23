abstract class Scenario {

    protected _objectsToDraw: Array<ObjectDefault>;

    constructor(){
        this.initObjects();
    }

    protected abstract initObjects(): void;

    get objectsToDraw(): Array<ObjectDefault>{
        return this.objectsToDraw;
    }

    protected getObjects(): Array<ObjectDefault>{
        let objects = new Array<ObjectDefault>();
        objects = objects.concat(this._objectsToDraw);
        return objects;
    }

    public drawObjects(canvas: CanvasManipulator): void{
        if(this._objectsToDraw.length == 0)
            return;
        this._objectsToDraw.forEach(obj => obj.draw(canvas));
    }

    public refreshObjects(canvas: CanvasManipulator): void{
        if(this._objectsToDraw.length == 0)
            return;
        this._objectsToDraw.forEach(obj => obj.refresh(canvas));
    }

    public destroyAllObjects(canvas: CanvasManipulator): void{
        if(this._objectsToDraw.length == 0)
            return;
        this._objectsToDraw.forEach(obj => obj.selfDestroy(canvas));
    }
}