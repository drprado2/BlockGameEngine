class Snake extends ObjectDefault{

    constructor(){
        let bodyBlocks = new Array<Rectangle>();
        bodyBlocks.push(new Rectangle(10, 10, true));
        super(bodyBlocks);
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

    private moveUp(distance: number) {
        let lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        let firstBlock = this.bodyBlocks[0];
        let newPositionX = firstBlock.positionX;
        let newPositionY = firstBlock.positionY - distance;
        let blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        let newBlocks = new Array<Rectangle>();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    }

    private moveRight(distance: number) {
        let lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        let firstBlock = this.bodyBlocks[0];
        let newPositionX = firstBlock.positionX + distance;
        let newPositionY = firstBlock.positionY;
        let blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        let newBlocks = new Array<Rectangle>();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    }

    private moveDown(distance: number) {
        let lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        let firstBlock = this.bodyBlocks[0];
        let newPositionX = firstBlock.positionX;
        let newPositionY = firstBlock.positionY + distance;
        let blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        let newBlocks = new Array<Rectangle>();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    }

    private moveLeft(distance: number) {
        let lastBlock = this.bodyBlocks[this.bodyBlocks.length - 1];
        let firstBlock = this.bodyBlocks[0];
        let newPositionX = firstBlock.positionX - distance;
        let newPositionY = firstBlock.positionY;
        let blocksOutLastBLock = this.bodyBlocks.slice(0, this.bodyBlocks.length - 1);
        let newBlocks = new Array<Rectangle>();
        newBlocks.push(this.bodyBlocks[this.bodyBlocks.length - 1]);
        this.bodyBlocks = newBlocks.concat(blocksOutLastBLock);
    }
}