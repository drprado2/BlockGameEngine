abstract class ObjectDefault implements IMoveAble{

    private bodyBlocks: Array<Rectangle>;
    private currentDirection: Directions;

    constructor(bodyBlocks: Array<Rectangle>){
        this.bodyBlocks = bodyBlocks;
        this.currentDirection = Directions.right;
     }

     public updateDirection(direction: Directions): void{
         if(this.canChangeDirection(direction))
            this.currentDirection = direction;
     }

     private canChangeDirection(newDirection: Directions): boolean {
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

    public move(): void{
        switch(this.currentDirection){
            case Directions.up: {
                this.moveUp(globalDistanceMove);
                break;
            }
            case Directions.down: {
                this.moveDown(globalDistanceMove);
                break;
            }
            case Directions.left: {
                this.moveLeft(globalDistanceMove);
                break;
            }
            case Directions.right: {
                this.moveRight(globalDistanceMove);
                break;
            }
        }
    }

    moveUp(distance: number) {
        let lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        let firstBlock = this.bodyBlocks[0];
        let newPositionX = firstBlock.positionX;
        let newPositionY = firstBlock.positionY - distance;
        let blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        let newBlocks = new Array<Rectangle>();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    }

    moveRight(distance: number) {
        let lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        let firstBlock = this.bodyBlocks[0];
        let newPositionX = firstBlock.positionX + distance;
        let newPositionY = firstBlock.positionY;
        let blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        let newBlocks = new Array<Rectangle>();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    }

    moveDown(distance: number) {
        let lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        let firstBlock = this.bodyBlocks[0];
        let newPositionX = firstBlock.positionX;
        let newPositionY = firstBlock.positionY + distance;
        let blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        let newBlocks = new Array<Rectangle>();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    }

    moveLeft(distance: number) {
        let lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        let firstBlock = this.bodyBlocks[0];
        let newPositionX = firstBlock.positionX - distance;
        let newPositionY = firstBlock.positionY;
        let blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        let newBlocks = new Array<Rectangle>();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    }

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