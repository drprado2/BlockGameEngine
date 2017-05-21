abstract class ObjectDefault{

    protected bodyBlocks: Array<Rectangle>;
    protected currentDirection: Directions;

    constructor(bodyBlocks: Array<Rectangle>){
        this.bodyBlocks = bodyBlocks;
        this.currentDirection = Directions.right;
     }

     public updateDirection(direction: Directions): void{
         if(this.canChangeDirection(direction))
            this.currentDirection = direction;
     }

     protected canChangeDirection(newDirection: Directions): boolean {
         switch(newDirection){
            case Directions.up: {
                let firstBlock = this.bodyBlocks[0];
                let newPositionX = firstBlock.positionX;
                let newPositionY = firstBlock.positionY - globalDistanceMove;
                if (this.bodyBlocks[1].positionX == newPositionX &&
                    this.bodyBlocks[1].positionY == newPositionY)
                    return false;
                return true;    
            }
            case Directions.right: {
                let firstBlock = this.bodyBlocks[0];
                let newPositionX = firstBlock.positionX + globalDistanceMove;
                let newPositionY = firstBlock.positionY;
                if (this.bodyBlocks[1].positionX == newPositionX &&
                    this.bodyBlocks[1].positionY == newPositionY)
                    return false;
            }
            case Directions.down: {
                let firstBlock = this.bodyBlocks[0];
                let newPositionX = firstBlock.positionX;
                let newPositionY = firstBlock.positionY + globalDistanceMove;
                if (this.bodyBlocks[1].positionX == newPositionX &&
                    this.bodyBlocks[1].positionY == newPositionY)
                    return false;
            }
            case Directions.left: {
                let firstBlock = this.bodyBlocks[0];
                let newPositionX = firstBlock.positionX - globalDistanceMove;
                let newPositionY = firstBlock.positionY;
                if (this.bodyBlocks[1].positionX == newPositionX &&
                    this.bodyBlocks[1].positionY == newPositionY)
                    return false;
            }
            default: {
                return true;
            }
         }
    }

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
        this.bodyBlocks.forEach(block => block.draw(canvas.contextCanvas));
    }

    refresh(canvas: CanvasManipulator): void{
        this.draw(canvas);
    }

    selfDestroy(canvas: CanvasManipulator): void{
        this.bodyBlocks.forEach(block => block.selfDestroy(canvas.contextCanvas));
    }
}