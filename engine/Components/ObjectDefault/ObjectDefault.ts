abstract class ObjectDefault{

    protected bodyBlocks: Array<Rectangle>;
    protected currentDirection: Directions;

    constructor(bodyBlocks: Array<Rectangle>){
        this.bodyBlocks = bodyBlocks;
        this.currentDirection = Directions.right;
     }

     public abstract updateDirection(direction: Directions): void;

    public abstract move(): void;    

    getBodyBlocks(): Array<Rectangle>{
        return new Array<Rectangle>().concat(this.bodyBlocks); 
    }

    getOnlyCollideBodyBlocks(): Array<Rectangle>{
        let collideBlocks = new Array<Rectangle>();
        this.bodyBlocks.forEach(block => {
            if(block.itsCollide)
                collideBlocks.push(block)
        })
        return collideBlocks; 
    }

    draw(canvas: CanvasManipulator): void{
        this.bodyBlocks.forEach(block => block.draw(canvas));
    }

    refresh(canvas: CanvasManipulator): void{
        this.draw(canvas);
    }

    selfDestroy(canvas: CanvasManipulator): void{
        this.bodyBlocks.forEach(block => block.selfDestroy(canvas));
    }
}