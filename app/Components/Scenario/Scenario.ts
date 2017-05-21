abstract class Scenario {

    public template: string;
    public widthCanvas: number;
    public heightCanvas: number;
    public idCanvas: string = "canvasGame";

    protected objectsToDraw: Array<ObjectDefault>;

    constructor(){
        this.initObjects();
        this.startTemplate();
    }

    public getIdCanvas(): string{
        return this.idCanvas;
    }

    protected abstract initObjects(): void;

    protected getObjects(): Array<ObjectDefault>{
        let objects = new Array<ObjectDefault>();
        objects = objects.concat(this.objectsToDraw);
        return objects;
    }

    protected startTemplate(): void{
        this.template = `
            <canvas id="${this.idCanvas}" width="${this.widthCanvas}" height="${this.heightCanvas}"></canvas>
        `
    }

    public drawObjects(canvas: CanvasManipulator): void{
        this.objectsToDraw.forEach(obj => obj.draw(canvas));
    }

    public refreshObjects(canvas: CanvasManipulator): void{
        this.objectsToDraw.forEach(obj => obj.refresh(canvas));
    }

    public destroyAllObjects(canvas: CanvasManipulator): void{
        this.objectsToDraw.forEach(obj => obj.selfDestroy(canvas));
    }
}