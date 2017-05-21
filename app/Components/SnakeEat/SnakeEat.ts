class SnakeEat extends ObjectDefault{

    public move(): void {
        return;
    }

    constructor(widthCanvas: number, heightCanvas: number){
        let randomX = Shared.generateRandomNumber(0, widthCanvas - globalBlockWidth);
        let randomY = Shared.generateRandomNumber(0, heightCanvas - globalBlockHeight);
        let eatBlock = new Rectangle(randomX, randomY, true);
        let eatBlocks = new Array<Rectangle>();
        eatBlocks.push(eatBlock);
        super(eatBlocks);
    }
}